package Labs.Labs07;

public class Sorter {

 private SorterStrategy strategy;
 public void sort(SorterStrategy strategy, Comparable[] arr){
  strategy.sort(arr);
 }
 public void SetStrategy(SorterStrategy strategy){
  this.strategy = strategy;
 }
}
