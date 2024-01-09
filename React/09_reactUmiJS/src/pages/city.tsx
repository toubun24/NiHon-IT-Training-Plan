// ./src/pages/city.tsx

import { useEffect, useState } from 'react';
import { IndexBar, List } from 'antd-mobile';
import { useHistory } from 'umi';
import { connect } from '@@/plugin-dva/exports';
import cityName from '@/models/cityName';

const City = (props: any) => {
    const history = useHistory();
    const filterCity = (cities: any) => {
        const letterArr: Array<string> = [];
        const citylist = [];
        for (var i = 65; i < 91; i++) {
            letterArr.push(String.fromCharCode(i));
        }
        for (var m in letterArr) {
            var cityitems = cities.filter(
                (c: any) => c.pinyin.substring(0, 1).toUpperCase() === letterArr[m],
            );
            cityitems.length &&
                citylist.push({
                    title: letterArr[m],
                    items: cityitems,
                });
        }
        return citylist;
    };
    const [list, setList] = useState<any>([]);
    useEffect(() => {
        fetch('https://m.maizuo.com/gateway?k=1005428', {
            method: 'GET',
            headers: {
                'X-Client-Info':
                    '{"a":"3000","ch":"1002","v":"5.2.0","e":"16454231757924214661121"}',
                'X-Host': 'mall.film-ticket.city.list',
            },
        })
            .then((response) => response.json())
            .then((response) => {
                setList(filterCity(response.data.cities));
            });
    }, []);
    const changeCity = (item: any) => {
        props.dispatch({
            type: 'city/changeCity',
            data: {
                cityName: item.name,
                cityId: item.cityId,
            },
        });
        history.push('/cinema');
    };
    return (
        <div style={{ height: window.innerHeight }}>
            <IndexBar>
                {list.map((item: any) => {
                    const { title, items } = item;
                    return (
                        <IndexBar.Panel index={title} title={title} key={title}>
                            <List>
                                {items.map((item: any, index: number) => (
                                    <List.Item
                                        key={index}
                                        onClick={() => {
                                            changeCity(item);
                                        }}
                                    >
                                        {item.name}
                                    </List.Item>
                                ))}
                            </List>
                        </IndexBar.Panel>
                    );
                })}
            </IndexBar>
        </div>
    );
};

export default connect()(City);