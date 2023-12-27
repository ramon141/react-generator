import { createHTML } from "./utils";

export function exportPDF(
    element,
    margin = '0px 0px',
    fileName = 'Relatório Pró Disciplinas',
    size = 'auto'
) {
    var iframe = document.createElement('iframe');

    const body = createHTML(fileName, element, margin, size);

    const lastName = document.title;
    document.title = fileName;

    iframe.width = "100%";
    iframe.style.display = 'none';

    const isFirefox = typeof InstallTrigger !== 'undefined';

    if (isFirefox) {
        const bodyElement = document.getElementsByTagName("body")[0];
        bodyElement.appendChild(iframe);

        iframe.focus();
        iframe.contentDocument.body.innerHTML = '';
        iframe.contentDocument.write(body);
    } else {
        iframe.setAttribute("srcdoc", body);

        const bodyElement = document.getElementsByTagName("body")[0];
        bodyElement.appendChild(iframe);
    }

    iframe.contentWindow.print();

    setTimeout(() => { document.title = lastName; }, 100);
}