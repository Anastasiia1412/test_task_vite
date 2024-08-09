export default {
    base: '/test_task_vite/',
    //скопировала из стековерфлоу тут https://stackoverflow.com/questions/72618944/get-error-to-build-my-project-in-vite-top-level-await-is-not-available-in-the
    build: {
        target: 'esnext' //browsers can handle the latest ES features
    }
}