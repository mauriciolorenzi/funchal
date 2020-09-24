function ready(callbackFunc) {
    if (document.readyState !== 'loading') {
        // Document is already ready, call the callback directly
        callbackFunc();
    } else if (document.addEventListener) {
        // All modern browsers to register DOMContentLoaded
        document.addEventListener('DOMContentLoaded', callbackFunc);
    } else {
        // Old IE browsers
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState === 'complete') {
                callbackFunc();
            }
        });
    }
}

ready(function () {
    let pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js';

    pdfjsLib.getDocument(`/files${window.location.pathname}.pdf`).promise.then(doc => {
        renderCanvas(doc.numPages);
        for(var i = 1; i <= doc.numPages; i++)
        {
            renderPdfPage(doc, i);
        }
    });
});

function renderCanvas(totalCanvas)
{
    let canvas = '';
    for(var i = 1; i <= totalCanvas;i++)
    {
        canvas += `<canvas id="pdfcanvas-${i}"></canvas>`;
    }

    document.getElementsByTagName("body")[0].innerHTML = canvas;
}

function renderPdfPage(doc, numPage)
{
    doc.getPage(numPage).then(page => {
        let canvas = document.getElementById(`pdfcanvas-${numPage}`);
        let context = canvas.getContext("2d");
        let viewport = page.getViewport({scale: 1});
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        page.render({
            canvasContext: context,
            viewport: viewport
        });
}, (reason) => {
    // PDF loading error
    console.error(reason);
});
}