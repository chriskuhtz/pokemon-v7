import { useCallback, useContext, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaFistRaised, FaHammer, FaLock, FaLockOpen, FaWrench } from "react-icons/fa";
import { GiMountainRoad } from "react-icons/gi";
import { MdCatchingPokemon, MdPersonAddAlt1 } from "react-icons/md";
import { PiFarm } from "react-icons/pi";
import { InGamePage } from "../../components/InGamePage/InGamePage";
import { battleSpriteSize } from "../../constants/baseConstants";
import {
  CampUpgrade,
  campUpgradeBadgeRequirements,
  campUpgradeBaseCost,
  campUpgradeCategories,
  CampUpgradeCategory,
  campUpgradeCategoryColors,
  campUpgradeCostMultipliers,
  campUpgradeExplanations,
  campUpgradeNames,
  categorizedCampUpgrades
} from "../../constants/gameData/campUpgrades";
import { typeColors } from "../../constants/typeColors";
import { ArrayHelpers } from "../../functions/ArrayHelpers";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { Card } from "../../uiComponents/Card/Card";
import { ListItem } from "../../uiComponents/ListItem/ListItem";
import { Stack } from "../../uiComponents/Stack/Stack";


export const CampUpgrades = ({
  goBack,
}: {
  goBack: () => void;
}): JSX.Element => {
  // console.log("total upgrade costs", Object.values(campUpgradeCostMultipliers).reduce((sum,summand)=>{return sum+summand*campUpgradeBaseCost},0))
  // console.log("total quest rewards", Object.values(KumaQuestsRecord).reduce((sum,summand)=>{return sum+summand.researchPoints},0))
   
  const [category, setCategory] = useState<number>(0);
 const { saveFile,  } = useContext(SaveFileContext);



  return (
    <InGamePage headline="Main Menu:" goBack={goBack}>
      <Stack mode="column">
        <h3 style={{ margin: 0 }}>
          We can use the research points earned from quests to expand our camp
        </h3>
        <h3>Research Points: {saveFile.researchPoints}</h3>
        <UpgradeCategoryCard setTraitIndex={setCategory} category={ArrayHelpers.getEntryWithOverflow([...campUpgradeCategories], category)}/>
      </Stack>
    </InGamePage>
  );
};

const UpgradeCategoryCard = ({
  category,
  setTraitIndex,
}: {
  category:CampUpgradeCategory,
  setTraitIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
   const { addMessage } = useContext(MessageQueueContext);
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

  const { campUpgrades, researchPoints } = saveFile;

  const unlock = useCallback(
    (id: CampUpgrade) => {
      //if (researchPoints < campUpgradePrices[id]) {
      const price=campUpgradeCostMultipliers[id]*campUpgradeBaseCost
      if (researchPoints < price) {
        addMessage({ message: "Earn more research points" });
        return;
      }
      addMessage({ message: `Unlocked ${id}`, needsNoConfirmation: true });
      patchSaveFileReducer({
        researchPoints: researchPoints -price,
        campUpgrades: { ...campUpgrades, [id]: true },
      });
    },
    [addMessage, campUpgrades, patchSaveFileReducer, researchPoints],
  );

  const hasAllBasics=saveFile.campUpgrades.bulletin_board && saveFile.campUpgrades.berry_farm && saveFile.campUpgrades["apricorn smith kurt"]
  
  return (
    <Card
      backgroundColor={campUpgradeCategoryColors[category]}
      key={category}
      icon={
       <CampUpgradeIcon category={category}/>
      }
      content={
        <Stack mode="column" alignItems="center">
          <div style={{ width: "100%" }}>
            <Stack mode="row" justifyContent={hasAllBasics?"space-between":"center"} alignItems="center">
              {hasAllBasics && <FaArrowLeft
                role="button"
                tabIndex={0}
                size={battleSpriteSize}
                onClick={() =>setTraitIndex((t) => t - 1)}
                onKeyDown={(e) => {
               
                  e.stopPropagation();
                  if (e.key === "Enter") {
                    setTraitIndex((t) => t - 1);
                  }
                }}
              />}
              <h3>{category}:</h3>
              {hasAllBasics &&<FaArrowRight
                size={battleSpriteSize}
                onClick={() =>setTraitIndex((t) => t + 1)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  
                  e.stopPropagation();
                  if (e.key === "Enter") {
                    setTraitIndex((t) => t - 1);
                  }
                }}
              />}
            </Stack> 
          </div>
         {campUpgradeNames.filter(upgrade=>categorizedCampUpgrades[upgrade]===category).map(upgrade=>{

          const price=campUpgradeCostMultipliers[upgrade]*campUpgradeBaseCost
          const unlocked=saveFile.campUpgrades[upgrade]===true
          const hasBulletinBoard=upgrade=="bulletin_board"?true: !!saveFile.campUpgrades.bulletin_board
          const hasEnoughPoints=saveFile.researchPoints>=price
          const hasEnoughBadges=saveFile.badges.length>=campUpgradeBadgeRequirements[upgrade]
          const canUnlock=hasEnoughBadges&&hasEnoughPoints
          return  <ListItem 
          backgroundColor={unlocked?typeColors["grass"]:campUpgradeCategoryColors[category]}
          disabled={!hasBulletinBoard||!hasEnoughBadges||!hasEnoughPoints}
          onClick={()=>unlocked?{}:unlock(upgrade)}
          primaryIcon={unlocked?<FaLockOpen size={battleSpriteSize/2} />:canUnlock?<CampUpgradeIcon category={category}/>:<FaLock size={battleSpriteSize/2} />}
          content={`${upgrade} `} 
          additionalContent={<>{unlocked?"Unlocked":!hasEnoughPoints?"complete quests to earn points":hasEnoughBadges?campUpgradeExplanations[upgrade]:"Defeat Gym Leaders to earn badges"}</>}
          hint={`${price} points`}
          infoButton={<></>}/>
         }
        )}
        </Stack>
      }
      actionElements={[
        
      ]}
    />
  );
};


const CampUpgradeIcon = ({
  category,
  onClick,
  highlighted,
}: {
  category: CampUpgradeCategory;
  onClick?: () => void;
  highlighted?: boolean;
}) => {

 switch(category){
    case "Training and Battle":
      return  <FaFistRaised
        size={battleSpriteSize}
        onClick={onClick}
        tabIndex={0}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter" && onClick) {
            onClick();
          }
        }}
        color={highlighted ? typeColors["grass"] : undefined}
      />
    case "Ranging and Wildlife":
      return  <GiMountainRoad
        size={battleSpriteSize}
        onClick={onClick}
        tabIndex={0}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter" && onClick) {
            onClick();
          }
        }}
        color={highlighted ? typeColors["grass"] : undefined}
      />
    case "Sustainability":
      return <PiFarm
        size={battleSpriteSize}
        onClick={onClick}
        tabIndex={0}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter" && onClick) {
            onClick();
          }
        }}
        color={highlighted ? typeColors["grass"] : undefined}
      />
      case "Crafting":
        return <FaWrench size={battleSpriteSize}
        onClick={onClick}
        tabIndex={0}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter" && onClick) {
            onClick();
          }
        }}
        color={highlighted ? typeColors["grass"] : undefined}
      />
        case "Guests":
          return <MdPersonAddAlt1 size={battleSpriteSize}
        onClick={onClick}
        tabIndex={0}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter" && onClick) {
            onClick();
          }
        }}
        color={highlighted ? typeColors["grass"] : undefined}
      />
          case "Tools and Certs":
            return <FaHammer size={battleSpriteSize}
        onClick={onClick}
        tabIndex={0}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter" && onClick) {
            onClick();
          }
        }}
        color={highlighted ? typeColors["grass"] : undefined}
      />

    case "Basics":
      return <MdCatchingPokemon
        size={battleSpriteSize}
        onClick={onClick}
        tabIndex={0}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter" && onClick) {
            onClick();
          }
        }}
        color={highlighted ? typeColors["grass"] : undefined}
      />

  }

};
