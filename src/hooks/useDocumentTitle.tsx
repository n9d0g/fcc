import { useEffect, useState } from 'react';

const useDocumentTitle = (title:any) => {
	const [documentTitle, setDocumentTitle] = useState(title);

	useEffect(() => {
		document.title = "FCC | " + documentTitle;
	}, [documentTitle]);

	return [documentTitle, setDocumentTitle];
}

export { useDocumentTitle };