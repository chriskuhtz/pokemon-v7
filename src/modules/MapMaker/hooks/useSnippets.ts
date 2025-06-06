import { useCallback, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { GroupPlacer } from '../MapMaker';

const snippetsId = 'mapMaker_snippets';
export const useSnippets = () => {
	const local = window.localStorage.getItem(snippetsId);
	const loaded = local
		? (JSON.parse(local) as { id: string; snippet: GroupPlacer }[])
		: [];

	const [snippets, setSnippets] =
		useState<{ id: string; snippet: GroupPlacer }[]>(loaded);
	//SYNC WITH LOCAL STORAGE
	useEffect(() => {
		window.localStorage.setItem(snippetsId, JSON.stringify(snippets));
	}, [snippets]);

	const addSnippet = useCallback((update: GroupPlacer) => {
		setSnippets((s) => [...s, { id: v4(), snippet: update }]);
	}, []);
	const removeSnippet = useCallback((id: string) => {
		setSnippets((snippets) => snippets.filter((s) => s.id !== id));
	}, []);

	return { snippets, addSnippet, removeSnippet };
};
