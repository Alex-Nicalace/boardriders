interface IIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

function IconDown({
  width = 12,
  height = 8,
  fill = 'black',
}: IIconProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 12 8"
      fill={fill}
    >
      <path
        d="M1.41 0L6 4.45391L10.59 0L12 1.3779L6 7.2L0 1.3779L1.41 0Z"
        fill={fill}
      />
    </svg>
  );
}

export default IconDown;
