Ext.onReady(function () {
    const textarea = document.querySelector(
        `#modx-file-content, #modx-plugin-plugincode, #modx-template-content,
         #modx-chunk-snippet, #mod-console-codeeditor, #modx-snippet-snippet, #modalconsole-editor`
    );

    const value = textarea.value;
    const container = textarea.parentNode.parentNode;
    let aBlock = document.createElement('div');
    let child = container.appendChild(aBlock);


    textarea.style.display = 'none';
    //container.style.height = '400px';
    child.style.height = 'calc(100vh - 150px)';

    // require.config({ paths: { 'vs': `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${version}/min/vs` } });
    require.config({ paths: { 'vs': `/assets/components/monaco` } });

    window.MonacoEnvironment = {
        getWorkerUrl: (workerId, label) => {
            return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
                self.MonacoEnvironment = {
                    baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${version}/min/'
                };
                importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${version}/min/vs/base/worker/workerMain.js');`
            )}`;
        }
    };
    require(['vs/editor/editor.main'], () => {
        const monEditor = monaco.editor.create(child, {
            value,
            language,
            theme: 'vs-dark',
            multiCursorModifier: 'ctrlCmd',
            wordWrap: 'on',
            wrappingIndent: 'indent',
        });
        monEditor.onDidChangeModelContent(() => {
            textarea.value = monEditor.getValue();
        });
        monEditor.getModel().updateOptions({ tabSize: 4 });

        emmetMonaco.emmetCSS(monaco, ['css', 'scss']);
        emmetMonaco.emmetHTML(monaco, ['html', 'twig']);
    });
});
