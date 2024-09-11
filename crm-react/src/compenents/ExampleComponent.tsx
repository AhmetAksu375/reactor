// ExampleComponent.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ExampleComponent() {
    const navigate = useNavigate();

    useEffect(() => {
        // Bileşen yüklendiğinde bu kod çalışır ve "/target-page" adresine yönlendirir.
        navigate('/company');
    }, []); // Boş bağımlılık dizisi, sadece ilk renderda çalışır.

    return (
        <div>
            <h1>Yönlendirme Yapılıyor...</h1>
        </div>
    );
}

export default ExampleComponent;
