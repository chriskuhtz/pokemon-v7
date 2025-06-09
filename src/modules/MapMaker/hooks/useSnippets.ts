import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 } from 'uuid';
import { GroupPlacer } from '../components/MapEditor';

export type Snippet = {
	id: string;
	snippet: GroupPlacer;
	tileSetUrl: string;
};
const snippetsId = 'mapMaker_snippets';
export const useSnippets = (tileSetUrl: string) => {
	const local = window.localStorage.getItem(snippetsId);
	const loaded = local ? (JSON.parse(local) as Snippet[]) : [];

	const [snippets, setSnippets] = useState<Snippet[]>(loaded);
	//SYNC WITH LOCAL STORAGE
	useEffect(() => {
		window.localStorage.setItem(snippetsId, JSON.stringify(snippets));
	}, [snippets]);

	const addSnippet = useCallback(
		(update: GroupPlacer) => {
			setSnippets((s) => [...s, { id: v4(), snippet: update, tileSetUrl }]);
		},
		[tileSetUrl]
	);
	const removeSnippet = useCallback((id: string) => {
		setSnippets((snippets) => snippets.filter((s) => s.id !== id));
	}, []);

	const availableSnippets = useMemo(
		() => snippets.filter((s) => s.tileSetUrl === tileSetUrl),
		[snippets, tileSetUrl]
	);

	return { snippets: availableSnippets, addSnippet, removeSnippet };
};
