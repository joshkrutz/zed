import { Tile } from "./Tile";

export function Gallery({ data }) {
  const showGalleryTiles = data && Array.isArray(data) && data.length > 0;
  return (
    <div>
      {showGalleryTiles &&
        data.map((item, index) => (
          <Tile key={`item-${item.id}-${index}`} data={item} />
        ))}
      {!showGalleryTiles && <p>No matching items.</p>}
    </div>
  );
}
