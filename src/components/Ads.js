import classes from './Ads.module.scss';

export default function Ads({ products }) {
  console.log(products, 'From ads component');
  return <h1>This is ads</h1>;
}
