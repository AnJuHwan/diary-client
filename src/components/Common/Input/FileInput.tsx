import React, { ChangeEvent } from 'react';
import styles from './fileInput.module.scss';

interface IProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = ({ onChange }: IProps) => {
  return <input type='file' accept='image/*' className={styles.file} onChange={onChange} />;
};

export default FileInput;
