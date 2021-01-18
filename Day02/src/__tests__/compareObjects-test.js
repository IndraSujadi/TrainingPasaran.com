// Kalau hanya import 1 item dari sebuah file
import compareObjects from '../compareObjects'; 

it('normal with return value = true'), () => {
    expect(compareObjects({one : 1, two : 2}, {two : 2, one: 1}).toEqual(true));
} 

it('different object length , return = false'), () => {
    expect(compareObjects({one : 1, two : 2, three:3}, {two : 2, one: 1}).toEqual(false));
} 

it('different proprties value , return = false'), () => {
    expect(compareObjects({one : 1, two : 3}, {two : 2, one: 1}).toEqual(false));
} 

// untuk latihan
//  tidak bisa di run karena blm install library jest