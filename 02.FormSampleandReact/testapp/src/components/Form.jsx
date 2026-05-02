import "../css/CrudOperations.css";

function Form({ title, name, setname, age, setage, onSubmit, onCancel, submitLabel }) {
  return (
    <div className="form-overlay">
      <div className="user-form">
        <h3 className="form-title">{title}</h3>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setage(e.target.value)}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" onClick={onSubmit}>
              {submitLabel}
            </button>
            <button type="button" className="btn btn-cancel" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
