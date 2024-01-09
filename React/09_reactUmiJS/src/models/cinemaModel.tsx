// ./src/models/cinemaModel.tsx

export default {
    namespace: 'cinema',
    state: {
        list: [],
    },
    reducers: {
        setlist(prevState: any, action: any) {
            return { ...prevState, list: action.data };
        },
        clearlist(prevState: any, action: any) {
            return { ...prevState, list: [] };
        },
    },
    effects: {
        *getcinemaList(action: any, obj: any): any {
            const { put, call } = obj;
            var result = yield call(getcinema, action.data.cityId);
            yield put({
                type: 'setlist',
                data: result,
            });
        },
    },
};
async function getcinema(cityId: any) {
    var res = await fetch(
        `https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=1&k=2668404`,
        {
            method: 'GET',
            headers: {
                'X-Client-Info':
                    '{"a":"3000","ch":"1002","v":"5.2.0","e":"16454231757924214661121","bc":"110100"}',
                'X-Host': 'mall.film-ticket.cinema.list',
            },
        },
    ).then((response) => response.json());
    return res.data.cinemas;
}
