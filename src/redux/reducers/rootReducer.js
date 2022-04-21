const getItem = (item) => {
    return localStorage.getItem(item)
}

const initialState = JSON.parse(getItem('initial')) === null ? {
    images: [
        {
            id: 'id-1',
            name: 'Домик у озера',
            url: 'https://phonoteka.org/uploads/posts/2021-06/1625068550_17-phonoteka_org-p-dom-u-ozera-oboi-krasivo-18.jpg',
            description: 'Домик у озера. Где-то в Исландии, рядом с населенным пунктом Омаха.'
        },
        {
            id: 'id-2',
            name: 'Волна..',
            url: 'https://w-dog.ru/wallpapers/3/8/458029425161755/solnce-volna-ballonchik.jpg',
            description: 'Просто волна.'
        },
        {
            id: 'id-3',
            name: 'Nissan GTR',
            url: 'https://kurgan.ananasposter.ru/image/catalog/poster/cars/81/15183.jpg',
            description: 'Мой будущий авто..'
        },
        {
            id: 'id-4',
            name: 'Японский сад',
            url: 'https://design-bathroom.ru/wp-content/uploads/2020/09/%D1%8F%D0%BF%D0%BE%D0%BD%D1%81%D0%BA%D0%B8%D0%B9-%D1%81%D0%B0%D0%B429.jpg',
            description: 'Очень красивый сад в Японии. Тут есть мостики, пруд и красивый японский дом.'
        },
        {
            id: 'id-5',
            name: 'Закат в Сиднее',
            url: 'https://wall-photo.ru/wp-content/uploads/2019/04/1235562295-sh-Sydney.-Cityscape-image-of-Sydney-Australia-with-Harbour-Bridge-and-Sydney-skyline-during-sunset.jpg',
            description: 'Купить фотообои "Закат в Сиднее" можно в интернете..'
        }
    ],
    edit: false,
    preview: false,
    add: false
} : JSON.parse(getItem("initial"));

export const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'CHANGE_IMG_ARAY':
            return { ...state, images: action.payload }    
        case 'CHANGE_EDIT_STATUS':
            return { ...state, edit: action.payload }  
        case 'CHANGE_PREVIEW_STATUS':
            return { ...state, preview: action.payload }  
        case 'CHANGE_ADD_STATUS':
            return { ...state, add: action.payload }              
        default: return state
    }
}