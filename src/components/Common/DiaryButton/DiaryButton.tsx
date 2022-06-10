import styles from './diaryButton.module.scss';

interface IProps {
  onClick: () => void;
  text: string;
}

const DiaryButton = ({ onClick, text }: IProps) => {
  return (
    <div className={styles.buttonBox}>
      <button type='button' onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default DiaryButton;
