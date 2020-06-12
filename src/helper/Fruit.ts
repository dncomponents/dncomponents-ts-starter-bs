import {java} from 'j4ts';
import List = java.util.List;
import ArrayList = java.util.ArrayList;
import Arrays = java.util.Arrays;
import {TreeNode} from 'dncomponents/lib/tree/TreeNode';

export class Fruit {
    public static fruits: java.util.List<Fruit> = Arrays.asList(
        new Fruit('Bell pepper', 'Non-sweet'),
        new Fruit('Cucumber', 'Non-sweet'),
        new Fruit('Tomato', 'Non-sweet'),
        //Sub-acid
        new Fruit('Apple', 'Sub-acid'),
        new Fruit('Apricot', 'Sub-acid'),
        new Fruit('Blackberry', 'Sub-acid'),
        new Fruit('Cherry', 'Sub-acid'),
        //Sweet
        new Fruit('Banana', 'Sweet'),
        new Fruit('Papaya', 'Sweet'),
        new Fruit('Prune', 'Sweet'),
        //Acid
        new Fruit('Kiwi', 'Acid'),
        new Fruit('Lemon', 'Acid'),
        new Fruit('Orange', 'Acid')
    );


    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.toString = () => {
            return this.name;
        };
    }

    name: string;
    description: string;


    public static getFruits(number: number): List<Fruit> {
        let fruitList = new ArrayList<Fruit>();
        let n = 0;
        let nam = 0;
        for (let i = 0; i < number; i++) {
            let fruit = this.fruits.get(nam++);
            if (nam == this.fruits.size() - 1) nam = 0;
            fruitList.add(new Fruit(fruit.name + '  ' + n++, 'The ' + fruit.name
                + ' is a ' + fruit.description + ' fruit'));
        }
        return fruitList;
    }

    public static getFruitsTree(): TreeNode<any> {
        let root = new TreeNode<any>('root');
        {
            let node = new TreeNode<any>('Non-sweet');
            node.add(new TreeNode(new Fruit('Avocado', 'fruit')));
            node.add(new TreeNode(new Fruit('Bell pepper', 'fruit')));
            node.add(new TreeNode(new Fruit('Cucumber', 'fruit')));
            node.add(new TreeNode(new Fruit('Tomato', 'fruit')));
            root.add(node);
        }
        {
            let node = new TreeNode<any>('Sub-acid');
            node.add(new TreeNode(new Fruit('Apple', 'fruit')));
            node.add(new TreeNode(new Fruit('Apricot', 'fruit')));
            node.add(new TreeNode(new Fruit('Blackberry', 'fruit')));
            node.add(new TreeNode(new Fruit('Cherry', 'fruit')));
            root.add(node);
        }
        {
            let node = new TreeNode<any>('Sweet');
            node.add(new TreeNode(new Fruit('Banana', 'fruit')));
            node.add(new TreeNode(new Fruit('Papaya', 'fruit')));
            node.add(new TreeNode(new Fruit('Prune', 'fruit')));
            root.add(node);
        }
        {
            let node = new TreeNode<any>('Acid');
            node.add(new TreeNode(new Fruit('Kiwi', 'fruit')));
            node.add(new TreeNode(new Fruit('Lemon', 'fruit')));
            node.add(new TreeNode(new Fruit('Orange', 'fruit')));
            root.add(node);
        }
        return root;
    }

}