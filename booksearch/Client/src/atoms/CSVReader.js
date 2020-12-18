import React from "react";
import { useDropzone } from "react-dropzone";

/**
 * CSVデータを投入された際に実行されるコールバック
 *
 * @callback onDropHandler
 * @param {File[]} file
 * 他のパラメータは現在不使用なので省略
 */

/**
 * @typedef Props
 * @property {onDropHandler} onDrop
 */

/**
 * CSVデータをドラッグアンドドロップで投入できるコンポーネント
 * @param {Props} props
 */
const CSVFileReader = (props) => {
  const onDrop = React.useCallback(props.onDrop, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".csv",
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "black solid 1px",
        height: "50vh",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>ここにドロップ</p>
      ) : (
        <p>ドラッグアンドドロップかクリックでCSVファイルを追加</p>
      )}
    </div>
  );
};

export default CSVFileReader;
