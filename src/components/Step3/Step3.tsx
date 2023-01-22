import React, { useState, useEffect } from "react";
import { Form, Select, InputNumber, Button, Col, Tooltip, Row} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import "./Step3.css"

interface Props {
  availableDishesForSelection: SelectedDish[];
  selectedMeal: string;
  selectedRestaurant: Dish | undefined;
  onSubmit: (selectedDishes: SelectedDish[]) => void;
  onBack: () => void;
  minServings: number;
}

interface Dish {
  id: number;
  name: string;
  restaurant: string;
  availableMeals: string[];
}

interface SelectedDish {
  id: number;
  name: string;
  servings: number;
}

const Step3: React.FC<Props> = ({
  minServings,
  availableDishesForSelection,
  selectedMeal,
  selectedRestaurant,
  onSubmit,
  onBack,
}) => {
  const [selectedDishes, setSelectedDishes] = useState<SelectedDish[]>([]);
  const [totalServings, setTotalServings] = useState(1);
  useEffect(() => {
    if (availableDishesForSelection.length > 0) {
      setSelectedDishes([
        {
          id: availableDishesForSelection[0].id,
          name: availableDishesForSelection[0].name,
          servings: 1,
        },
      ]);
    }
  }, [availableDishesForSelection]);
 
  const handleSelectChange = (value: string, idx: number) => {
    const selectedDishObject = availableDishesForSelection.find(
      (dish) => dish.name === value
    );
    const newSelectedDishes = [...selectedDishes];
    newSelectedDishes[idx].id = selectedDishObject?.id || -1;
    newSelectedDishes[idx].name = value;
    setSelectedDishes(newSelectedDishes);
  };

  const handleServingsChange = (value: number | null, idx: number) => {
    const newSelectedDishes = [...selectedDishes];
    newSelectedDishes[idx].servings = value || 0;
    setSelectedDishes(newSelectedDishes);
    setTotalServings(
      selectedDishes.reduce((acc, dish) => acc + dish.servings, 0)
    );
  };


  const handleAddClick = () => {
    const newSelectedDishes = [...selectedDishes, { id: 0, name: "", servings: 1 }];
    setSelectedDishes(newSelectedDishes);
    let servings = 0;
    newSelectedDishes.forEach((i) => {
      servings += i.servings;
    });
    setTotalServings(servings);
  };

  const handleRemoveClick = (idx: number) => {
    const removedDish = selectedDishes[idx];
    const newSelectedDishes = [
      ...selectedDishes.slice(0, idx),
      ...selectedDishes.slice(idx + 1),
    ];
    setSelectedDishes(newSelectedDishes);
    let servings = 0;
    newSelectedDishes.forEach((i) => {
      servings += i.servings;
    });
    setTotalServings(servings);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    onSubmit(selectedDishes);
  };

  const renderSelect = (dish: SelectedDish, idx: number) => (
    <div key={idx}>
      <Form.Item>
        <Row gutter={16}>
          <Col className="gutter-row" span={8}>
            <label className="global-label">
              Select Dish:
              <Select
                onChange={(value) => handleSelectChange(value, idx)}
                value={dish.name}
              >
                <Select.Option value="">please select a dish</Select.Option>
                {availableDishesForSelection.map((Adish, idx) => (
                  <Select.Option
                    key={Adish.id}
                    value={Adish.name}
                    disabled={selectedDishes.some(
                      (selectedDish) => selectedDish.name === Adish.name
                    )}
                  >
                    {Adish.name}
                  </Select.Option>
                ))}
              </Select>
            </label>
          </Col>
          <Col className="gutter-row" span={5}>
            <label className="global-label">
              Select Servings:
              <InputNumber
                type="number"
                style={{ width: '130px' }}
                min={1}
                max={10}
                value={dish.servings}
                onChange={(value) => handleServingsChange(value, idx)}
              />
            </label>
          </Col>
          <Col className="gutter-row" span={3}>
            {
              selectedDishes.length > 1 && (
                <div className="remove-padding">
                  <Button icon={<DeleteOutlined />} onClick={() => handleRemoveClick(idx)}></Button>
                </div>
              )
            }
          </Col>
        </Row>
      </Form.Item>
    </div>
  );

  return (
    <Form className="global-step step3" onFinish={handleSubmit}>
      <h3 className="step3-h3">
        Select dishes for {selectedMeal} at {selectedRestaurant?.restaurant}:
      </h3>
      <div>
        {selectedDishes.map((dish, idx) => renderSelect(dish, idx))}
        <Button
          icon={<PlusOutlined />}
          disabled={selectedDishes.length >= availableDishesForSelection.length}
          onClick={handleAddClick}
        >
          Add Dish
        </Button>
      </div>
      <p className="step3-text">
        <Tooltip
          title="The total number of dishes should be greater or equal to the number of people selected and maximum of 10"
        >
          <span>Total Servings:{" "}</span>
          <span
            className={
              totalServings < minServings || totalServings > 10
                ? "global-warn"
                : ""
            }
          >
            {totalServings}
          </span>
          <span>/ Min: {minServings} / Max: 10</span>
        </Tooltip>
      </p>
      <Button className="global-previous" onClick={onBack}>
        Previous
      </Button>
      <Button
        htmlType="submit"
        type="primary"
        disabled={
          totalServings < minServings ||
          totalServings > 10 ||
          selectedDishes.some((dish) => dish.name === "")
        }
      >
        Next
      </Button>
      </Form>
  );
};

export default Step3;
