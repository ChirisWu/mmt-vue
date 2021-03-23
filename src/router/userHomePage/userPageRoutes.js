
const creationTypesPath = [
    '/create_video',
    '/create_radio',
    '/create_moment'
]

export function goCreation(router){
    router.push('/creation')
}
export function goCreationTypes(route, index) {
    route.push(creationTypesPath[index])
}