import React from "react";
import { MdDelete } from "react-icons/md";
import { Stack } from "../../../uiComponents/Stack/Stack";
import { GroupPlacer } from "./MapEditor";
import { TileGroupDisplay } from "./TileGroupDisplay";

export const SnippetSelection = ({
  tileSetUrl,
  snippets,
  selectSnippet,
  remove,
}: {
  tileSetUrl: string;
  snippets: { id: string; snippet: GroupPlacer }[];
  selectSnippet: (x: GroupPlacer) => void;
  remove: (id: string) => void;
}) => {
  return (
    <React.Fragment>
      <h3>Snippets:</h3>
      <Stack mode="column">
        {snippets.map((s) => (
          <Stack mode="row">
            <MdDelete
              size={32}
              onClick={(e) => {
                e.stopPropagation();
                remove(s.id);
              }}
            />
            <div onClick={() => selectSnippet(s.snippet)}>
              <TileGroupDisplay tileSetUrl={tileSetUrl} selected={s.snippet} />
            </div>
          </Stack>
        ))}
      </Stack>
    </React.Fragment>
  );
};
