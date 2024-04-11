import { useState } from 'react';
import { Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const ImgUpload= () => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

//   const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };

//   const onPreview = async (file: UploadFile) => {
//     let src = file.url as string;
//     if (!src) {
//       src = await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj as FileType);
//         reader.onload = () => resolve(reader.result as string);
//       });
//     }
//     const image = new Image();
//     image.src = src;
//     const imgWindow = window.open(src);
//     imgWindow?.document.write(image.outerHTML);
//   };

  return (
    <ImgCrop rotationSlider>
      <Upload
        // listType="picture-card"
        // fileList={fileList}
        // onChange={onChange}
        showUploadList={false}
        // onPreview={onPreview}
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

export default ImgUpload;