// @flow
import React from 'react';
import colorRgba from 'color-rgba';
import colorStringify from 'color-stringify';

import {MOD, TYPE} from './constants'

import type {EmptyPhotoProps} from './Empty.jsx.flow'

const POINT_GREY = 0x7F;
const FONT_FAMILY = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygdeen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`;

const canvas = document.createElement('canvas');

const greyColor = (color) => color[0] * 0.2126 + color[1] * 0.7152 + color[2] * 0.0722;

const invertColor = (color) => color.map((part, index) => index === 3 ? part : 255 - part);
const greyScaleColor = (color) => {
  const _greyColor = greyColor(color);

  return invertColor([_greyColor, _greyColor, _greyColor, color[3]]);
}
const blackAndWhite = (color) => greyColor(color) > POINT_GREY ? [0, 0, 0, color[3]] : [255, 255, 255, color[3]]

const colorString = (colorMod) => (color) => colorStringify(colorMod(colorRgba(color)))

const getColorByScheme = ({color, scheme}) => {
  switch (scheme) {
    case MOD.BW:
      return colorString(blackAndWhite)(color);

    case MOD.GS:
      return colorString(greyScaleColor)(color);

    case MOD.INV:
      return colorString(invertColor)(color);

    default:
      return colorString(blackAndWhite)(color);
  }
}

const getImage = ({color, width, height, type, quality, scheme}) => {
  const canvasProp = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;

  canvasProp.fillStyle = color;
  canvasProp.fillRect(0, 0, width, height);

  canvasProp.fillStyle = getColorByScheme({color, scheme});

  canvasProp.textAlign = 'center';
  canvasProp.textBaseline = 'middle';
  canvasProp.font = `${Math.min(height, width) / 8}px ${FONT_FAMILY}`;

  canvasProp.fillText(`${width}x${height}`, width / 2, height / 2);

  return canvas.toDataURL(`image/${type}`, quality);
}

const EmptyPhoto = ({
  width = 100,
  height = 100,
  color = '#9de',
  quality = 0.9,
  JPEG = true,
  BW = true,
  PNG,
  WEBP,
  INV,
  GS,
  ...props
}: EmptyPhotoProps) => {
  const scheme = (BW && MOD.BW) || (INV && MOD.INV) || (GS && MOD.GS);
  const type: string = (JPEG && TYPE.JPEG) || (PNG && TYPE.PNG) || (WEBP && TYPE.WEBP);

  return (
    <img
      {...props}
      src={getImage({color, width, height, scheme, type, quality})}
    />
  )
}

export default EmptyPhoto
