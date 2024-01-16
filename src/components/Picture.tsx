export interface IPictureProps {
  sources: React.SourceHTMLAttributes<HTMLSourceElement>[];
  img: React.ImgHTMLAttributes<HTMLImageElement>;
}
function Picture({ sources, img }: IPictureProps): JSX.Element {
  return (
    <picture>
      {sources.map((source) => (
        <source key={source.srcSet} {...source} />
      ))}
      <img {...img} alt={img.alt} />
    </picture>
  );
}

export default Picture;
