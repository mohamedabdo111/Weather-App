interface Imain {
  temp: number;
  feels_like: number;
  humidity: number;
}

interface Iwind {
  speed: number;
}
interface Iweather {
  main: string;
}
interface IWeather {
  name: string;
  cod: number;
  main: Imain;
  wind: Iwind;
  weather: Iweather[];
}

export interface Iprops {
  weathers: IWeather;
  isLoading: boolean;
  error: any;
}
