
const creationTypesPath = [
    '/create/video',
    '/create/audio',
    '/create_whisper'
]

export function goCreation(router){
    router.push('/creation')
}
export function goCreationTypes(route, index) {
    route.push(creationTypesPath[index])
}