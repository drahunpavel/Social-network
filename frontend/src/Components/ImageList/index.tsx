import { IconButton } from '@material-ui/core';
import React from 'react';
import { useHomeStyles } from '../../pages/Home/theme';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

interface ImageListProps {
    // images: string[];
    images: any[];
    classes: ReturnType<typeof useHomeStyles>;
    removeImage?: (url: string) => void;
};

export const ImageList: React.FC<ImageListProps> = ({
    images,
    classes,
    removeImage
}) => {

    if (!images.length) {
        return null;
    };

    return (
        <div className={classes.imageList}>
            {images.map((url, index) => (
                <div key={index} className={classes.imageListItem}>
                    <img src={url} alt='photo' className={'post-image'} />
                    {removeImage && <IconButton className={classes.removeIcon} onClick={(): void => removeImage(url)} >
                        <RemoveCircleIcon style={{ fontSize: 14 }} />
                    </IconButton>}
                </div>
            ))}
        </div>
    )
};