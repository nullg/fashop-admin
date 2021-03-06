// @flow
import React, { Component } from "react";
import styles from "./index.css";
import { View } from "react-web-dom";
import InfoRow from "../../public/info/infoRow";
import moment from "moment";

type Props = {
    deliver_name: string,
    deliver_phone: string,
    deliver_address: string,
    tracking_time: number,
    tracking_no: string,
    remark: string,
}
type State = {}
export default class DeliverInfo extends Component<Props, State> {
    render() {
        const { deliver_name, deliver_phone, deliver_address, tracking_time, tracking_no, remark } = this.props
        return (
            <View className={styles.infoWarp}>
                <p className={styles.infoTitle}>发货信息</p>
                <InfoRow
                    infoList={[
                        {
                            title: '发货人',
                            info: deliver_name,
                        }, {
                            title: '电话',
                            info: deliver_phone,
                        }, {
                            title: '发货地址',
                            info: deliver_address,
                        }, {
                            title: '物流单号',
                            info: tracking_no ? tracking_no : '无',
                        }
                        , {
                            title: '发货时间',
                            info: moment(tracking_time, 'X').format('YYYY-MM-DD HH:mm:ss'),
                        }, {
                            title: '发货备注',
                            info: remark ? remark : '无',
                        }
                    ]}
                />
            </View>
        );
    }
}
