import { shuffle } from "lodash";
import { useCallback, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import { InGamePage } from "../../components/InGamePage/InGamePage";
import { PokemonSprite } from "../../components/PokemonSprite/PokemonSprite";
import { ONE_HOUR } from "../../constants/baseConstants";
import { baseInternalDex } from "../../constants/baseInternalDex";
import { allBst } from "../../constants/baseStatRecord";
import { testPokemon } from "../../constants/gameData/gameData";
import { PokemonName, pokemonNames } from "../../constants/pokemonNames";
import { ArrayHelpers } from "../../functions/ArrayHelpers";
import { getHighestStat } from "../../functions/getHighestStat";
import { getTypeNames } from "../../functions/getTypeNames";
import { QUIZ_MASTER_ID, startBlocker } from "../../functions/TimedEvent";
import { useGetBattleTeam } from "../../hooks/useGetBattleTeam";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { joinInventories } from "../../interfaces/Inventory";
import {
  evoStones,
  expCandies,
  heldItems,
  ItemType,
  lures,
} from "../../interfaces/Item";
import { OwnedPokemon } from "../../interfaces/OwnedPokemon";
import { PokemonData } from "../../interfaces/PokemonData";
import {
  pokemonTypes,
  typeEffectivenessChart,
} from "../../interfaces/PokemonType";
import { stats } from "../../interfaces/StatObject";
import { Card } from "../../uiComponents/Card/Card";
import { LoadingScreen } from "../../uiComponents/LoadingScreen/LoadingScreen";

interface QuizMasterQuestion {
  text: string;
  options: string[];
  correctAnswer: string;
}

interface QuizMasterState {
  questions: {
    pokemon: PokemonName;
    question: QuizMasterQuestion;
    answeredCorrectly: boolean;
    id: string;
  }[];
  reward: ItemType;
}

const questionTypes = [
  "nameOfPokemon",
  "typeOfPokemon",
  "bstOfPokemon",
  "highestStatOfPokemon",
  "weaknessOfPokemon",
] as const;

type QuestionType = (typeof questionTypes)[number];

const getBstQuestion = (pokemon: PokemonName) => {
  const bst = allBst[pokemon];

  const options = ArrayHelpers.shuffle([
    bst,
    bst + Math.ceil(Math.random() * 100),
    bst - Math.ceil(Math.random() * 100),
  ]).map((o) => o.toString());
  return {
    text: `what is the base stat total of ${pokemon}`,
    options,
    correctAnswer: bst.toString(),
  };
};
const getNameQuestion = (pokemon: PokemonName) => {
  const options = ArrayHelpers.shuffle([
    pokemon,
    ArrayHelpers.getRandomEntry([...pokemonNames]),
    ArrayHelpers.getRandomEntry([...pokemonNames]),
  ]);
  return {
    text: `what is the name of this pokemon`,
    correctAnswer: pokemon,
    options,
  };
};
const getTypeQuestion = (pokemon: PokemonName) => {
  const options = ArrayHelpers.shuffle([
    baseInternalDex[pokemon].types.join("|"),
    baseInternalDex[ArrayHelpers.getRandomEntry([...pokemonNames])].types.join(
      "|",
    ),
    baseInternalDex[ArrayHelpers.getRandomEntry([...pokemonNames])].types.join(
      "|",
    ),
  ]);
  return {
    text: `what is the type of ${pokemon}`,
    correctAnswer: baseInternalDex[pokemon].types.join("|"),
    options,
  };
};
const getHighestStatQuestion = (
  pokemon: PokemonName,
  data: PokemonData,
): QuizMasterQuestion => {
  const highestStat = getHighestStat({
    ownedPokemon: testPokemon,
    data,
    ownerTrait: "archaeologist",
    pokemonTypes: getTypeNames({ ...testPokemon, data }),
    settings: undefined,
  })[0];

  let options = [highestStat];

  options.push(
    ArrayHelpers.getRandomEntry([...stats].filter((s) => !options.includes(s))),
  );
  options.push(
    ArrayHelpers.getRandomEntry([...stats].filter((s) => !options.includes(s))),
  );

  options = ArrayHelpers.shuffle(options);

  return {
    text: `which is ${pokemon}'s best stat`,
    correctAnswer: highestStat,
    options,
  };
};
const getWeaknessQuestion = (
  pokemon: PokemonName,
  data: PokemonData,
): QuizMasterQuestion => {
  const types = getTypeNames({ data } as OwnedPokemon & {
    data: PokemonData;
  });

  const superEffective = pokemonTypes.find(
    (type) =>
      types.some((t) =>
        typeEffectivenessChart[type].isSuperEffectiveAgainst.includes(t),
      ) &&
      !types.some(
        (t) =>
          typeEffectivenessChart[type].doesntEffect.includes(t) ||
          typeEffectivenessChart[type].isNotVeryEffectiveAgainst.includes(t),
      ),
  );
  const second = ArrayHelpers.getRandomEntry([
    ...pokemonTypes.filter((t) => t !== superEffective),
  ]);
  const third = ArrayHelpers.getRandomEntry([
    ...pokemonTypes.filter((t) => t !== superEffective && t !== second),
  ]);
  const options = shuffle([superEffective, second, third]).filter(
    (t) => t !== undefined,
  );
  return {
    text: `which one of these types is ${pokemon} weak to`,
    correctAnswer: pokemon,
    options,
  };
};
const getQuestion = (
  pokemon: PokemonName,
  type: QuestionType,
  data: PokemonData,
): QuizMasterQuestion => {
  switch (type) {
    case "bstOfPokemon":
      return getBstQuestion(pokemon);
    case "nameOfPokemon":
      return getNameQuestion(pokemon);
    case "typeOfPokemon":
      return getTypeQuestion(pokemon);
    case "highestStatOfPokemon":
      return getHighestStatQuestion(pokemon, data);
    case "weaknessOfPokemon":
      return getWeaknessQuestion(pokemon, data);
  }
};

const generateQuestion = (
  pokemon: PokemonName,
  data: PokemonData,
): QuizMasterQuestion => {
  const type: QuestionType = ArrayHelpers.getRandomEntry([...questionTypes]);

  return getQuestion(pokemon, type, data);
};
const generateQuizMasterState = (
  pokemon: { name: PokemonName; data: PokemonData }[],
): QuizMasterState => {
  return {
    questions: pokemon.map((mon) => ({
      id: v4(),
      pokemon: mon.name,
      question: generateQuestion(mon.name, mon.data),
      answeredCorrectly: false,
    })),
    reward: ArrayHelpers.getRandomEntry([
      ...heldItems,
      ...lures,
      ...evoStones,
      ...expCandies,
    ]),
  };
};
export const QuizMaster = () => {
  const { res: team, status } = useGetBattleTeam(
    [
      { ...testPokemon, name: ArrayHelpers.getRandomEntry([...pokemonNames]) },
      { ...testPokemon, name: ArrayHelpers.getRandomEntry([...pokemonNames]) },
      { ...testPokemon, name: ArrayHelpers.getRandomEntry([...pokemonNames]) },
    ],
    {},
  );

  if (status === "fetching" || status === "uninitialized") {
    return <LoadingScreen />;
  }
  if (!team || status === "error") {
    return <></>;
  }

  return <QuizMasterContent pokemon={team} />;
};
const QuizMasterContent = ({
  pokemon,
}: {
  pokemon: { name: PokemonName; data: PokemonData }[];
}): JSX.Element => {
  const [state, setState] = useState<QuizMasterState>();
  const { addMultipleMessages, latestMessage, addMessage } =
    useContext(MessageQueueContext);
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const goBack = useCallback(
    (item?: ItemType) => {
      patchSaveFileReducer({
        ...startBlocker(saveFile, QUIZ_MASTER_ID, ONE_HOUR),
        meta: { ...saveFile.meta, activeTab: "OVERWORLD" },
        bag: item
          ? joinInventories(saveFile.bag, { [`${item}`]: 1 })
          : saveFile.bag,
      });
    },
    [patchSaveFileReducer, saveFile],
  );
  useEffect(() => {
    if (!state) {
      setState(generateQuizMasterState(pokemon));
    }
    if (
      state &&
      state.questions.length > 0 &&
      state.questions.every((q) => q.answeredCorrectly) &&
      !latestMessage
    ) {
      addMultipleMessages([
        { message: "Brilliant" },
        {
          message: `I reward you with this: ${state.reward}`,
          onRemoval: () => {
            goBack(state.reward);
          },
        },
      ]);
    }
  }, [addMultipleMessages, goBack, latestMessage, pokemon, state]);

  const giveUp = () => {
    addMultipleMessages([
      { message: "So you give up" },
      {
        message: "Better Luck next time",
        onRemoval: () => {
          goBack();
        },
      },
    ]);
  };

  const answerCorrectly = (id: string) => {
    if (!state) {
      return;
    }
    addMessage({
      message: "Excellent!",
      onRemoval: () => {
        setState({
          ...state,
          questions: state.questions.map((q) => {
            if (id === q.id) {
              return { ...q, answeredCorrectly: true };
            }
            return q;
          }),
        });
      },
    });
  };
  const answerIncorrectly = () => {
    addMultipleMessages([
      { message: "Oh no, thats wrong" },
      {
        message: "Better Luck next time",
        onRemoval: () => {
          goBack();
        },
      },
    ]);
  };

  const nextQuestion = state?.questions.find((q) => !q.answeredCorrectly);
  return (
    <InGamePage headline="Quiz Master" goBack={() => giveUp()}>
      <h3>
        Question Nr{" "}
        {state?.questions.filter((s) => s.answeredCorrectly).length ?? 0 + 1}
      </h3>
      {nextQuestion && (
        <Card
          icon={<PokemonSprite sizeFactor={2} name={nextQuestion.pokemon} />}
          content={nextQuestion.question.text}
          actionElements={nextQuestion.question.options.map((op) => (
            <button
              onClick={() => {
                if (op === nextQuestion.question.correctAnswer) {
                  answerCorrectly(nextQuestion.id);
                } else answerIncorrectly();
              }}
            >
              {op}
            </button>
          ))}
        />
      )}
    </InGamePage>
  );
};
