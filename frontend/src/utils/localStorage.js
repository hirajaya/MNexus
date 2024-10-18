export const addFavoriteToLocalStorage = (product) => {
    const favorites = getFavoritesFromLocalStorage();
    if (!favorites.some((p) => p._id === product._id)) {
      favorites.push(product);
      localStorage.setItem("favourites", JSON.stringify(favorites));
    }
  };
  
  export const removeFavoriteFromLocalStorage = (productId) => {
    const favorites = getFavoritesFromLocalStorage();
    const updateFavorites = favorites.filter(
      (product) => product._id !== productId
    );
  
    localStorage.setItem("favourites", JSON.stringify(updateFavorites));
  };

  export const getFavoritesFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem("favourites");
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
  };