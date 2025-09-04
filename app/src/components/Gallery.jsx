import { Tile } from "./Tile";

export function Gallery({ data }) {
  const showGalleryTiles = data && Array.isArray(data) && data.length > 0;
  return (
    <div className="flex flex-wrap gap-6 justify-center w-full">
      {showGalleryTiles &&
        data.map((item, index) => (
          <Tile key={`item-${item.id}-${index}`} data={item} />
        ))}
      {!showGalleryTiles && <p>There are no products to display.</p>}
    </div>
  );
}
