import ReactDOMServer from 'react-dom/server';

export function createHTML(
    title,
    element,
    margin,
    size
) {
    return `
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body {
                        margin: 0px 0px;
                        font-family: 'Arial Nova', Arial, sans-serif;
                        font-weight: normal;
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }
                    @page{
                        margin: ${margin}
                    }
                    @media print{
                        @page {size: ${size}}
                    }
                </style>
                <title>${title}</title>
            </head>

                <body>
                    ${ReactDOMServer.renderToStaticMarkup(element)}
                </body>
            </html>
        `;
}