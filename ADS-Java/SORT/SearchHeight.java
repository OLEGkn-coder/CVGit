package Labs.Labs09;     
import java.util.*;
public class SearchHeight {
 private int vertex;
 private List<List<Integer>> adjacencyList;

 public void Graph(int vertex){
  this.vertex = vertex;
  adjacencyList = new ArrayList<>();
  for(int i = 0; i < vertex; i++){
   adjacencyList.add(new LinkedList<>());
  }
 }

 public void Edge(int a, int b){
  adjacencyList.get(a).add(b);
  adjacencyList.get(b).add(a);
 }
  
 public void SearchInHeight(int a){
  Stack<Integer> stack = new Stack<>(); 
  boolean[] visit = new boolean[vertex];
  visit[a] = true;
  stack.push(a);
  while(!stack.isEmpty()){
   a = stack.pop();
   System.out.print(a + " ");
   for(int i : adjacencyList.get(a)){
    if(!visit[i]){
     visit[i] = true;
     stack.push(i);
    }
   }
  }
 }

 
}
