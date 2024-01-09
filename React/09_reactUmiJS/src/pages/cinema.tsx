// ./src/pages/cinema.tsx
// npm install antd-mobile-icons
// npm install antd-mobile

import { useEffect } from 'react';
import { NavBar, DotLoading } from 'antd-mobile';
import { SearchOutline } from 'antd-mobile-icons';
import { useHistory } from 'umi';
import { connect } from '@@/plugin-dva/exports';

const cinema = (props: any) => {
    const history = useHistory();
    useEffect(() => {
        if (props.list.length === 0) {
            props.dispatch({
                type: 'cinema/getcinemaList',
                data: {
                    cityId: props.cityId,
                },
            });
        } else {
            console.log('buffer');
        }
    }, []);

    return (
        <div>
            <NavBar
                back={props.cityName}
                right={<SearchOutline />}
                backArrow={false}
                onBack={() => {
                    props.dispatch({
                        type: 'cinema/clearlist',
                    });
                    history.push('/city');
                }}
            >
                标题
            </NavBar>
            {
                props.loading && <div style={{ fontSize: 24, textAlign: 'center' }}>
                    <DotLoading color='primary' />
                </div>
            }
            {props.list.map((item: any) => {
                return <li key={item.cinemaId}>{item.name}</li>;
            })}
        </div>
    );
};

export default connect((state: any) => {
    return {
        cityName: state.city.cityName,
        cityId: state.city.cityId,
        list: state.cinema.list,
        loading: state.loading.global
    };
})(cinema);
