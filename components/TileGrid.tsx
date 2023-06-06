import { View, Text, StyleSheet } from "react-native";
import english from "../layouts/english";
import type { Tile as ITile } from "../types";
import Tile from "./Tile";

const TileGrid = () => {
  const gridCols = 6;

  const homePage = english.pages.find((page) => page.name === "home");
  if (!homePage) return <Text>Page not found</Text>;
  const tileMatrix = homePage.tiles.reduce(
    (resultArray: ITile[][], item, index) => {
      const chunkIndex = Math.floor(index / gridCols);
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }
      resultArray[chunkIndex].push(item);
      return resultArray;
    },
    []
  );

  return (
    <View style={styles.tileGrid}>
      {tileMatrix.map((row: ITile[], index: number) => {
        return (
          <View style={styles.tileRow} key={"tile-row-" + index}>
            {row.map((item: ITile, index: number) => {
              return (
                <Tile
                  image={item.image + ""}
                  text={item.text}
                  key={"tile-item-" + index}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tileRow: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  tileGrid: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
});

export default TileGrid;
