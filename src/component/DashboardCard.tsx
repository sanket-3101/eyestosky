const DashboardCard = ({
  title,
  amount,
}: {
  title: string;
  amount: number;
}) => {
  return (
    <>
      <div className="col-lg-4">
        <section className="card card-featured-left card-featured-primary mb-3">
          <div className="card-body">
            <div className="widget-summary">
              <div className="widget-summary-col widget-summary-col-icon">
                <div className="summary-icon">
                  <i className="fas fa-user" />
                </div>
              </div>
              <div className="widget-summary-col">
                <div className="summary">
                  <h4 className="title">{title}</h4>
                  <div className="info">
                    <strong className="amount">{amount}</strong>
                  </div>
                </div>
                <div className="summary-footer">
                  <a
                    className="text-primary text-uppercase"
                    href="users-management.html"
                  >
                    (view all)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default DashboardCard;
