import {java} from 'j4ts';
import {Person} from './Person';
import {TestingHelper} from './TestingHelper';

export class Data {
    public static people: java.util.ArrayList<Person> = TestingHelper.getPeople(1000);

    public static setNulls(people: java.util.List<Person>) {
        people.get(3).name = (null);
        people.get(3).active = (null);
        people.get(3).currentColor = (null);
        people.get(3).age = (null);
        people.get(4).name = (null);
        people.get(4).active = (null);
        people.get(4).currentColor = (null);
        people.get(4).age = (null);
    }

    public static getPeople(): java.util.ArrayList<Person> {
        let people: java.util.ArrayList<Person> = <any>(new java.util.ArrayList<any>());
        let b: number = 0;
        for (let i: number = 0; i < 50; i++) {
            for (let index192 = TestingHelper.getPeople(1000).iterator(); index192.hasNext();) {
                let person = index192.next();
                let t: Person = new Person();
                t.id = (b++);
                t.name = (person.name);
                t.active = (person.active);
                t.currentColor = (person.currentColor);
                t.age = (person.age);
                t.date = (person.date);
                people.add(t);
            }
        }
        return people;
    }
}
 