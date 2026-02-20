export interface MapChildRenderer {
  init(): void    // egyszer fut, map betöltésekor
  update(map: maplibregl.Map): void                      // minden frame-ben fut (RAF loop)
  destroy(): void                     // takarítás
}