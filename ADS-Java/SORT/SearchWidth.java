package Labs.Labs09;
import java.util.*;


public class SearchWidth {
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

   public void SearchInWidth(int a){
    Queue<Integer> queue = new LinkedList<>();
    boolean[] visit = new boolean[vertex];
    visit[a] = true;
    queue.offer(a);
    while(!queue.isEmpty()){
     a = queue.poll();
     System.out.print(a + " ");
     for(int i : adjacencyList.get(a)){
      if(!visit[i]){
       visit[i] = true;
       queue.offer(i);
      }
     }
    }
   }
}
