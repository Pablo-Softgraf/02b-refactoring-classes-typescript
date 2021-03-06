import { useCallback, useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import api from '../../services/api';


export interface IFood {
  id: string | number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}


interface FoodProps {
  food: IFood;
  handleDelete: (id: string | number) => Promise<void>;
  handleEditFood: (data: IFood) => void;
}


export function Food(props: FoodProps) {
  /*
    desestruturou props.food
    const { available } = props.food;
    this.state = {
      isAvailable: available
    };
  */
  //const { available } = props.food;
  //const { food } = props;
  const { food, handleEditFood, handleDelete } = props;
  const [isAvailable, setIsAvailable] = useState(food.available);

  const toggleAvailable = useCallback(async () => {
    //const { food } = props;
    //const { isAvailable } = this.state;
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    });

    setIsAvailable(!isAvailable);
  }, [food, isAvailable])

  const setEditingFood = useCallback(() => {
    //const { food, handleEditFood } = props;
    handleEditFood(food);
  }, [handleEditFood, isAvailable])

  //  const { isAvailable } = this.state;
  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Dispon??vel' : 'Indispon??vel'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}


export default Food;
