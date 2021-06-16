import React, { useRef, useEffect, useState, useCallback } from 'react';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';

import { IconButton } from '@material-ui/core';
import { useHomeStyles } from '../../pages/Home/theme';
import { ImageObj } from '../AddTweetForm';
import { ImageList } from '../ImageList';

export interface UploadImagesProps {
    images: ImageObj[];
    onChangeImages: (callback: (prev: ImageObj[]) => ImageObj[]) => void;
};

export const UploadImages: React.FC<UploadImagesProps> = ({
    images, onChangeImages
}) => {
    const classes = useHomeStyles();

    const inputRef = useRef<HTMLInputElement>(null);

    const handleClickImage = () => {
        if (inputRef.current) {
            inputRef.current.click();
        };
    };

    const handleChangeFileInput = useCallback((event: Event) => { // ссылка на функцию не будет теряться вне звввисмости, обновиться стейт или нет
        if (event.target) {
            const target = (event.target as HTMLInputElement);
            // const file = target.files && target.files[0];
            const file = target.files?.[0];
            if (file) {
                const fileObj = new Blob([file]);
                onChangeImages(prev => [...prev, {
                    blobUrl: URL.createObjectURL(fileObj),
                    file
                }]);
            };
        };
    }, []);

    const removeImage = (url: string) => {
        onChangeImages(prev => prev.filter(obj => obj.blobUrl !== url));
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener('change', handleChangeFileInput)
        };

        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('change', handleChangeFileInput)
            };
        }
    }, [])


    return (
        <div>
            <ImageList images={images.map(obj => obj.blobUrl)} classes={classes} removeImage={removeImage} />
            <IconButton onClick={handleClickImage} color="primary">
                <ImageOutlinedIcon style={{ fontSize: 26 }} />
            </IconButton>
            <input ref={inputRef} type='file' hidden />
        </div>
    )
};

