import styles from './mainContainer.module.scss';

interface IProps {
  children: string | JSX.Element[] | JSX.Element;
}

const MainContainer = ({ children }: IProps) => {
  return <main className={styles.main}>{children}</main>;
};

export default MainContainer;
