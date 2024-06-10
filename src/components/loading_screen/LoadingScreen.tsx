import HashLoader from 'react-spinners/HashLoader'
import './Loader.css'
import { useAppSelector } from '../../hooks/store';
import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';

const LoadingScreen = () => {
    const isLoading = useAppSelector((state) => state.loading);

    const [showDelayMessage, setShowDelayMessage] = useState(false);
    let timeoutId: number;

    useEffect(() => {

        if (isLoading) {
            timeoutId = window.setTimeout(() => {
                setShowDelayMessage(true);
            }, 3000); // Mostrar el mensaje después de 3 segundos
        } else {
            setShowDelayMessage(false);
            clearTimeout(timeoutId);
        }

        return () => clearTimeout(timeoutId);
    }, [isLoading]);

    if (!isLoading) {
        return null;
    }

    return (
        <>
            <div className="loaderContainerMobile" >
                <HashLoader color='#A3FCE1' size={120} />
                {showDelayMessage &&
                    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography component="h2" variant="h4" className='bodyH3'>
                            Este servidor está alojado en una plataforma gratuita.
                        </Typography>
                        <Typography component="h4" className='bodyH3'>
                            Lo que puede causar que la primera consulta tarde un poco más. 
                        </Typography>
                        <Typography component="h4" className='bodyH3'>
                            Una vez que la consulta inicial se complete, la experiencia debería ser más fluida. Agradecemos tu comprensión y apoyo.
                        </Typography>
                        <Typography component="h2" variant="h6" className='bodyH3'>
                            ¡Gracias por tu paciencia! 
                        </Typography>
                    </Container>
                }
            </div>
            <div className="loaderContainer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <HashLoader color='#A3FCE1' size={150} />
                {showDelayMessage &&
                    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography component="h2" variant="h4" className='bodyH3'>
                            Este servidor está alojado en una plataforma gratuita.
                        </Typography>
                        <Typography component="h4" className='bodyH3'>
                            Lo que puede causar que la primera consulta tarde un poco más. 
                        </Typography>
                        <Typography component="h4" className='bodyH3'>
                            Una vez que la consulta inicial se complete, la experiencia debería ser más fluida. Agradecemos tu comprensión y apoyo.
                        </Typography>
                        <Typography component="h2" variant="h6" className='bodyH3'>
                            ¡Gracias por tu paciencia! 
                        </Typography>
                    </Container>
                }
            </div>
        </>
    )
};

export default LoadingScreen;
