// ./src/models/cityName.tsx

export default {
    namespace: 'city',
    state: {
        cityName: '北京',
        cityId: '110100',
    },
    reducers: {
        changeCity(prevState: any, action: any) {
            return {
                ...prevState,
                cityName: action.data.cityName,
                cityId: action.data.cityId,
            };
        },
    },
};
