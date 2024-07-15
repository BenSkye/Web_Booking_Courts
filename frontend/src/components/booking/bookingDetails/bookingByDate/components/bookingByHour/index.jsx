import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Row, Col, Divider, Button } from "antd";
import { playHourOfUserAPI } from "../../../../../../services/bookingAPI/bookingAPI"; // Adjust the path accordingly
import { Tooltip } from 'antd';



const PlayHourDetails = ({ duration }) => {
    const [thisduration, setthisDuration] = useState(0);

    const centerId = useParams();
    console.log('centerId cua playHour', centerId.id)
    const [playHour, setPlayHour] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('duration cua PlayHour', thisduration)
    }, [thisduration]);

    useEffect(() => {
        setthisDuration(duration);

    }, [duration]);

    useEffect(() => {
        const fetchPlayHour = async () => {
            try {
                const data = await playHourOfUserAPI(centerId.id);
                console.log('data cua PlayHour', data)
                setPlayHour(data);
            } catch (error) {
                console.error("Error fetching play hour data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayHour();
    }, [centerId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!playHour) {
        return <div>Bạn chưa mua giờ chơi ở sân này</div>;
    }

    return (
        <div>
            <Card title="Số giờ chơi của bạn" style={{ overflow: 'hidden' }}>
                <Row>
                    <Col span={12}>
                        <Tooltip title="Remaining Hours">
                            <strong style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                Số giờ chơi còn lại
                            </strong>
                        </Tooltip>
                    </Col>
                    <Col span={12} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <Tooltip title={playHour.remainingHours}>
                            {playHour.remainingHours} tiếng
                        </Tooltip>
                    </Col>
                </Row>
            </Card>
            <Button
                type="primary"
                style={{ backgroundColor: '#1890ff', borderColor: '#1890ff', marginTop: 16 }}
            >
                Đặt Sân Bằng Giờ Có Sẵn
            </Button>
        </div>
    );
};

export default PlayHourDetails;
