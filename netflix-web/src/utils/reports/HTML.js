import { createHTML } from "./utils";

export const exportHTML = (
    element,
    margin = '20px 0px',
    fileName = 'Relatório Pró Disciplinas'
) => {

    var htmlContent = createHTML(fileName, element, margin, 'auto');

    var tempLink = document.createElement("a");
    var blobFile = new Blob([htmlContent], { type: "text/html" });

    tempLink.setAttribute('href', URL.createObjectURL(blobFile));
    tempLink.setAttribute('download', `${fileName}.html`);
    tempLink.click();

    URL.revokeObjectURL(tempLink.href);
}