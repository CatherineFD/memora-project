import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Header, Icon, Button, Segment, SemanticCOLORS } from 'semantic-ui-react';
import '@memora/styles';

export type ErrorAction = {
  /** Текст на кнопке */
  text: string;
  /** Сделать кнопку основной (синей) */
  primary?: boolean;
  /** Ссылка для перехода (использует react-router если внутри приложения) */
  href?: string;
  /** Кастомный обработчик клика */
  onClick?: () => void;
};

export interface ErrorPageProps {
  /** Код ошибки (404, 403, 500, 'network' и т.д.). Влияет на иконку и текст по умолчанию */
  code?: number | string;
  /** Заголовок ошибки (переопределяет стандартный для кода) */
  title?: string;
  /** Подробное сообщение (переопределяет стандартное для кода) */
  message?: string;
  /** Название иконки Semantic UI (например, 'frown', 'shield alternate', 'server') */
  icon?: string;
  /** Массив кнопок действий внизу */
  actions?: ErrorAction[];
  /** Показывать ли кнопку "Назад" в браузере по умолчанию */
  showGoBack?: boolean;
}

const DEFAULT_ERROR_CONFIG: Record<string | number, { icon: string; title: string; message: string; color: SemanticCOLORS }> = {
  404: {
    icon: 'frown outline',
    title: 'Страница не найдена',
    message: 'Возможно, она была удалена, перемещена или вы ввели неверный адрес.',
    color: 'grey',
  },
  403: {
    icon: 'shield alternate',
    title: 'Доступ запрещен',
    message: 'У вас недостаточно прав для просмотра этой страницы или выполнения действия.',
    color: 'orange',
  },
  500: {
    icon: 'server',
    title: 'Ошибка сервера',
    message: 'Что-то пошло не так на нашей стороне. Мы уже работаем над исправлением.',
    color: 'red',
  },
  network: {
    icon: 'wifi slash',
    title: 'Проблема с соединением',
    message: 'Проверьте подключение к интернету и попробуйте снова.',
    color: 'yellow',
  },
};

export const ErrorPage: React.FC<ErrorPageProps> = ({
  code = 'unknown',
  title,
  message,
  icon,
  actions,
  showGoBack = true,
}) => {
  const navigate = useNavigate();
  
  const config = DEFAULT_ERROR_CONFIG[code] || DEFAULT_ERROR_CONFIG['network'];

  const finalTitle = title || config?.title;
  const finalMessage = message || config?.message;
  const finalIcon = icon || config?.icon;

  const defaultActions: ErrorAction[] = [
    {
      text: 'На главную',
      primary: true,
      href: '/',
    },
  ];

  if (showGoBack && window.history.length > 1) {
    defaultActions.unshift({
      text: 'Вернуться назад',
      onClick: () => navigate(-1),
    });
  }

  const finalActions = actions && actions.length > 0 ? actions : defaultActions;

  return (
    <Container text className="error-page-container" style={{ marginTop: '5rem', marginBottom: '5rem' }}>
      <Segment basic textAlign="center" className="error-segment">
        <Icon 
          className={finalIcon} 
          size="massive" 
          color={config?.color || 'grey'} 
          style={{ marginBottom: '1rem', opacity: 0.8 }} 
        />
        
        <Header as="h1" size="huge" style={{ marginBottom: '0.5rem' }}>
          {code !== 'unknown' && `${code} `}
          {finalTitle}
        </Header>
        
        <p style={{ 
          fontSize: 'var(--font-size-lg)', 
          color: 'var(--color-text-secondary)', 
          maxWidth: '500px', 
          margin: '0 auto 2rem auto',
          lineHeight: 'var(--line-height-relaxed)'
        }}>
          {finalMessage}
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {finalActions.map((action, index) => {
            if (action.href && !action.onClick) {
              return (
                <Button
                  key={index}
                  primary={action.primary}
                  size="large"
                  onClick={() => navigate(action.href!)}
                >
                  {action.text}
                </Button>
              );
            }
            
            return (
              <Button
                key={index}
                primary={action.primary}
                size="large"
                onClick={action.onClick}
              >
                {action.text}
              </Button>
            );
          })}
        </div>
      </Segment>
    </Container>
  );
};