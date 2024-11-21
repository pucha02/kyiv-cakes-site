import { useState } from "react";
import { useEffect } from "react";
import './AdminMarqueeManagement.css';

export const AdminMarqueeManagement = () => {
    const [newContent, setNewContent] = useState('');

    useEffect(() => {
      const fetchMarqueeContent = async () => {
        try {
          const response = await fetch('http://13.60.53.226/api/marquee/getContent');
          const data = await response.json();
          setNewContent(data.content);
        } catch (error) {
          console.error('Ошибка при получении контента бегущей строки:', error);
        }
      };
  
      fetchMarqueeContent();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://13.60.53.226/api/marquee/updateContent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newContent }),
            });

            if (response.ok) {
                alert('Контент успешно обновлен');
                setNewContent('');
            } else {
                alert('Ошибка при обновлении контента');
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <div className="admin-marquee-management">
            <form onSubmit={handleSubmit} className="marquee-form">
                <label className="marquee-label">
                    Новий текст стрічки
                    <input
                        type="text"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        className="marquee-input"
                    />
                </label>
                <button type="submit" className="submit-btn">Оновити</button>
            </form>
        </div>
    )
}
