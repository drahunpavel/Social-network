import React, { useRef, useEffect, useState, useCallback } from 'react';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { IconButton } from '@material-ui/core';
import { useHomeStyles } from '../../pages/Home/theme';

export const UploadImages = () => {
    const classes = useHomeStyles();

    const [images, setImages] = useState<string[]>([]);

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
                setImages(prev => [...prev, URL.createObjectURL(fileObj)]);
            };
        };
    }, []);

    const removeImage = (url: string) => {
        setImages(prev => prev.filter(_url => _url !== url));
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
            <div className={classes.imageList}>
                {images.map((url, index) => (
                    <div key={index} className={classes.imageListItem}>
                        <img src={url} alt='photo' />
                        <IconButton className={classes.removeIcon} onClick={(): void => removeImage(url)} >
                            <RemoveCircleIcon style={{ fontSize: 14 }} />
                        </IconButton>
                    </div>
                ))}
            </div>
            <IconButton onClick={handleClickImage} color="primary">
                <ImageOutlinedIcon style={{ fontSize: 26 }} />
            </IconButton>
            <input ref={inputRef} type='file' hidden />
        </div>
    )
};

