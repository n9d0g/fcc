<?php

namespace ChurchCRM\model\ChurchCRM\Base;

use \Exception;
use \PDO;
use ChurchCRM\model\ChurchCRM\QueryParameterOptions as ChildQueryParameterOptions;
use ChurchCRM\model\ChurchCRM\QueryParameterOptionsQuery as ChildQueryParameterOptionsQuery;
use ChurchCRM\model\ChurchCRM\Map\QueryParameterOptionsTableMap;
use Propel\Runtime\Propel;
use Propel\Runtime\ActiveQuery\Criteria;
use Propel\Runtime\ActiveQuery\ModelCriteria;
use Propel\Runtime\Collection\ObjectCollection;
use Propel\Runtime\Connection\ConnectionInterface;
use Propel\Runtime\Exception\PropelException;

/**
 * Base class that represents a query for the 'queryparameteroptions_qpo' table.
 *
 * Defines the values for the parameters for each query
 *
 * @method     ChildQueryParameterOptionsQuery orderByQpoId($order = Criteria::ASC) Order by the qpo_ID column
 * @method     ChildQueryParameterOptionsQuery orderByQpoQrpId($order = Criteria::ASC) Order by the qpo_qrp_ID column
 * @method     ChildQueryParameterOptionsQuery orderByQpoDisplay($order = Criteria::ASC) Order by the qpo_Display column
 * @method     ChildQueryParameterOptionsQuery orderByQpoValue($order = Criteria::ASC) Order by the qpo_Value column
 *
 * @method     ChildQueryParameterOptionsQuery groupByQpoId() Group by the qpo_ID column
 * @method     ChildQueryParameterOptionsQuery groupByQpoQrpId() Group by the qpo_qrp_ID column
 * @method     ChildQueryParameterOptionsQuery groupByQpoDisplay() Group by the qpo_Display column
 * @method     ChildQueryParameterOptionsQuery groupByQpoValue() Group by the qpo_Value column
 *
 * @method     ChildQueryParameterOptionsQuery leftJoin($relation) Adds a LEFT JOIN clause to the query
 * @method     ChildQueryParameterOptionsQuery rightJoin($relation) Adds a RIGHT JOIN clause to the query
 * @method     ChildQueryParameterOptionsQuery innerJoin($relation) Adds a INNER JOIN clause to the query
 *
 * @method     ChildQueryParameterOptionsQuery leftJoinWith($relation) Adds a LEFT JOIN clause and with to the query
 * @method     ChildQueryParameterOptionsQuery rightJoinWith($relation) Adds a RIGHT JOIN clause and with to the query
 * @method     ChildQueryParameterOptionsQuery innerJoinWith($relation) Adds a INNER JOIN clause and with to the query
 *
 * @method     ChildQueryParameterOptions|null findOne(ConnectionInterface $con = null) Return the first ChildQueryParameterOptions matching the query
 * @method     ChildQueryParameterOptions findOneOrCreate(ConnectionInterface $con = null) Return the first ChildQueryParameterOptions matching the query, or a new ChildQueryParameterOptions object populated from the query conditions when no match is found
 *
 * @method     ChildQueryParameterOptions|null findOneByQpoId(int $qpo_ID) Return the first ChildQueryParameterOptions filtered by the qpo_ID column
 * @method     ChildQueryParameterOptions|null findOneByQpoQrpId(int $qpo_qrp_ID) Return the first ChildQueryParameterOptions filtered by the qpo_qrp_ID column
 * @method     ChildQueryParameterOptions|null findOneByQpoDisplay(string $qpo_Display) Return the first ChildQueryParameterOptions filtered by the qpo_Display column
 * @method     ChildQueryParameterOptions|null findOneByQpoValue(string $qpo_Value) Return the first ChildQueryParameterOptions filtered by the qpo_Value column *

 * @method     ChildQueryParameterOptions requirePk($key, ConnectionInterface $con = null) Return the ChildQueryParameterOptions by primary key and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildQueryParameterOptions requireOne(ConnectionInterface $con = null) Return the first ChildQueryParameterOptions matching the query and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 *
 * @method     ChildQueryParameterOptions requireOneByQpoId(int $qpo_ID) Return the first ChildQueryParameterOptions filtered by the qpo_ID column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildQueryParameterOptions requireOneByQpoQrpId(int $qpo_qrp_ID) Return the first ChildQueryParameterOptions filtered by the qpo_qrp_ID column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildQueryParameterOptions requireOneByQpoDisplay(string $qpo_Display) Return the first ChildQueryParameterOptions filtered by the qpo_Display column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildQueryParameterOptions requireOneByQpoValue(string $qpo_Value) Return the first ChildQueryParameterOptions filtered by the qpo_Value column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 *
 * @method     ChildQueryParameterOptions[]|ObjectCollection find(ConnectionInterface $con = null) Return ChildQueryParameterOptions objects based on current ModelCriteria
 * @method     ChildQueryParameterOptions[]|ObjectCollection findByQpoId(int $qpo_ID) Return ChildQueryParameterOptions objects filtered by the qpo_ID column
 * @method     ChildQueryParameterOptions[]|ObjectCollection findByQpoQrpId(int $qpo_qrp_ID) Return ChildQueryParameterOptions objects filtered by the qpo_qrp_ID column
 * @method     ChildQueryParameterOptions[]|ObjectCollection findByQpoDisplay(string $qpo_Display) Return ChildQueryParameterOptions objects filtered by the qpo_Display column
 * @method     ChildQueryParameterOptions[]|ObjectCollection findByQpoValue(string $qpo_Value) Return ChildQueryParameterOptions objects filtered by the qpo_Value column
 * @method     ChildQueryParameterOptions[]|\Propel\Runtime\Util\PropelModelPager paginate($page = 1, $maxPerPage = 10, ConnectionInterface $con = null) Issue a SELECT query based on the current ModelCriteria and uses a page and a maximum number of results per page to compute an offset and a limit
 *
 */
abstract class QueryParameterOptionsQuery extends ModelCriteria
{
    protected $entityNotFoundExceptionClass = '\\Propel\\Runtime\\Exception\\EntityNotFoundException';

    /**
     * Initializes internal state of \ChurchCRM\model\ChurchCRM\Base\QueryParameterOptionsQuery object.
     *
     * @param     string $dbName The database name
     * @param     string $modelName The phpName of a model, e.g. 'Book'
     * @param     string $modelAlias The alias for the model in this query, e.g. 'b'
     */
    public function __construct($dbName = 'default', $modelName = '\\ChurchCRM\\model\\ChurchCRM\\QueryParameterOptions', $modelAlias = null)
    {
        parent::__construct($dbName, $modelName, $modelAlias);
    }

    /**
     * Returns a new ChildQueryParameterOptionsQuery object.
     *
     * @param     string $modelAlias The alias of a model in the query
     * @param     Criteria $criteria Optional Criteria to build the query from
     *
     * @return ChildQueryParameterOptionsQuery
     */
    public static function create($modelAlias = null, Criteria $criteria = null)
    {
        if ($criteria instanceof ChildQueryParameterOptionsQuery) {
            return $criteria;
        }
        $query = new ChildQueryParameterOptionsQuery();
        if (null !== $modelAlias) {
            $query->setModelAlias($modelAlias);
        }
        if ($criteria instanceof Criteria) {
            $query->mergeWith($criteria);
        }

        return $query;
    }

    /**
     * Find object by primary key.
     * Propel uses the instance pool to skip the database if the object exists.
     * Go fast if the query is untouched.
     *
     * <code>
     * $obj  = $c->findPk(12, $con);
     * </code>
     *
     * @param mixed $key Primary key to use for the query
     * @param ConnectionInterface $con an optional connection object
     *
     * @return ChildQueryParameterOptions|array|mixed the result, formatted by the current formatter
     */
    public function findPk($key, ConnectionInterface $con = null)
    {
        if ($key === null) {
            return null;
        }

        if ($con === null) {
            $con = Propel::getServiceContainer()->getReadConnection(QueryParameterOptionsTableMap::DATABASE_NAME);
        }

        $this->basePreSelect($con);

        if (
            $this->formatter || $this->modelAlias || $this->with || $this->select
            || $this->selectColumns || $this->asColumns || $this->selectModifiers
            || $this->map || $this->having || $this->joins
        ) {
            return $this->findPkComplex($key, $con);
        }

        if ((null !== ($obj = QueryParameterOptionsTableMap::getInstanceFromPool(null === $key || is_scalar($key) || is_callable([$key, '__toString']) ? (string) $key : $key)))) {
            // the object is already in the instance pool
            return $obj;
        }

        return $this->findPkSimple($key, $con);
    }

    /**
     * Find object by primary key using raw SQL to go fast.
     * Bypass doSelect() and the object formatter by using generated code.
     *
     * @param     mixed $key Primary key to use for the query
     * @param     ConnectionInterface $con A connection object
     *
     * @throws \Propel\Runtime\Exception\PropelException
     *
     * @return ChildQueryParameterOptions A model object, or null if the key is not found
     */
    protected function findPkSimple($key, ConnectionInterface $con)
    {
        $sql = 'SELECT qpo_ID, qpo_qrp_ID, qpo_Display, qpo_Value FROM queryparameteroptions_qpo WHERE qpo_ID = :p0';
        try {
            $stmt = $con->prepare($sql);
            $stmt->bindValue(':p0', $key, PDO::PARAM_INT);
            $stmt->execute();
        } catch (Exception $e) {
            Propel::log($e->getMessage(), Propel::LOG_ERR);
            throw new PropelException(sprintf('Unable to execute SELECT statement [%s]', $sql), 0, $e);
        }
        $obj = null;
        if ($row = $stmt->fetch(\PDO::FETCH_NUM)) {
            /** @var ChildQueryParameterOptions $obj */
            $obj = new ChildQueryParameterOptions();
            $obj->hydrate($row);
            QueryParameterOptionsTableMap::addInstanceToPool($obj, null === $key || is_scalar($key) || is_callable([$key, '__toString']) ? (string) $key : $key);
        }
        $stmt->closeCursor();

        return $obj;
    }

    /**
     * Find object by primary key.
     *
     * @param     mixed $key Primary key to use for the query
     * @param     ConnectionInterface $con A connection object
     *
     * @return ChildQueryParameterOptions|array|mixed the result, formatted by the current formatter
     */
    protected function findPkComplex($key, ConnectionInterface $con)
    {
        // As the query uses a PK condition, no limit(1) is necessary.
        $criteria = $this->isKeepQuery() ? clone $this : $this;
        $dataFetcher = $criteria
            ->filterByPrimaryKey($key)
            ->doSelect($con);

        return $criteria->getFormatter()->init($criteria)->formatOne($dataFetcher);
    }

    /**
     * Find objects by primary key
     * <code>
     * $objs = $c->findPks(array(12, 56, 832), $con);
     * </code>
     * @param     array $keys Primary keys to use for the query
     * @param     ConnectionInterface $con an optional connection object
     *
     * @return ObjectCollection|array|mixed the list of results, formatted by the current formatter
     */
    public function findPks($keys, ConnectionInterface $con = null)
    {
        if (null === $con) {
            $con = Propel::getServiceContainer()->getReadConnection($this->getDbName());
        }
        $this->basePreSelect($con);
        $criteria = $this->isKeepQuery() ? clone $this : $this;
        $dataFetcher = $criteria
            ->filterByPrimaryKeys($keys)
            ->doSelect($con);

        return $criteria->getFormatter()->init($criteria)->format($dataFetcher);
    }

    /**
     * Filter the query by primary key
     *
     * @param     mixed $key Primary key to use for the query
     *
     * @return $this|ChildQueryParameterOptionsQuery The current query, for fluid interface
     */
    public function filterByPrimaryKey($key)
    {

        return $this->addUsingAlias(QueryParameterOptionsTableMap::COL_QPO_ID, $key, Criteria::EQUAL);
    }

    /**
     * Filter the query by a list of primary keys
     *
     * @param     array $keys The list of primary key to use for the query
     *
     * @return $this|ChildQueryParameterOptionsQuery The current query, for fluid interface
     */
    public function filterByPrimaryKeys($keys)
    {

        return $this->addUsingAlias(QueryParameterOptionsTableMap::COL_QPO_ID, $keys, Criteria::IN);
    }

    /**
     * Filter the query on the qpo_ID column
     *
     * Example usage:
     * <code>
     * $query->filterByQpoId(1234); // WHERE qpo_ID = 1234
     * $query->filterByQpoId(array(12, 34)); // WHERE qpo_ID IN (12, 34)
     * $query->filterByQpoId(array('min' => 12)); // WHERE qpo_ID > 12
     * </code>
     *
     * @param     mixed $qpoId The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildQueryParameterOptionsQuery The current query, for fluid interface
     */
    public function filterByQpoId($qpoId = null, $comparison = null)
    {
        if (is_array($qpoId)) {
            $useMinMax = false;
            if (isset($qpoId['min'])) {
                $this->addUsingAlias(QueryParameterOptionsTableMap::COL_QPO_ID, $qpoId['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($qpoId['max'])) {
                $this->addUsingAlias(QueryParameterOptionsTableMap::COL_QPO_ID, $qpoId['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(QueryParameterOptionsTableMap::COL_QPO_ID, $qpoId, $comparison);
    }

    /**
     * Filter the query on the qpo_qrp_ID column
     *
     * Example usage:
     * <code>
     * $query->filterByQpoQrpId(1234); // WHERE qpo_qrp_ID = 1234
     * $query->filterByQpoQrpId(array(12, 34)); // WHERE qpo_qrp_ID IN (12, 34)
     * $query->filterByQpoQrpId(array('min' => 12)); // WHERE qpo_qrp_ID > 12
     * </code>
     *
     * @param     mixed $qpoQrpId The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildQueryParameterOptionsQuery The current query, for fluid interface
     */
    public function filterByQpoQrpId($qpoQrpId = null, $comparison = null)
    {
        if (is_array($qpoQrpId)) {
            $useMinMax = false;
            if (isset($qpoQrpId['min'])) {
                $this->addUsingAlias(QueryParameterOptionsTableMap::COL_QPO_QRP_ID, $qpoQrpId['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($qpoQrpId['max'])) {
                $this->addUsingAlias(QueryParameterOptionsTableMap::COL_QPO_QRP_ID, $qpoQrpId['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(QueryParameterOptionsTableMap::COL_QPO_QRP_ID, $qpoQrpId, $comparison);
    }

    /**
     * Filter the query on the qpo_Display column
     *
     * Example usage:
     * <code>
     * $query->filterByQpoDisplay('fooValue');   // WHERE qpo_Display = 'fooValue'
     * $query->filterByQpoDisplay('%fooValue%', Criteria::LIKE); // WHERE qpo_Display LIKE '%fooValue%'
     * </code>
     *
     * @param     string $qpoDisplay The value to use as filter.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildQueryParameterOptionsQuery The current query, for fluid interface
     */
    public function filterByQpoDisplay($qpoDisplay = null, $comparison = null)
    {
        if (null === $comparison) {
            if (is_array($qpoDisplay)) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(QueryParameterOptionsTableMap::COL_QPO_DISPLAY, $qpoDisplay, $comparison);
    }

    /**
     * Filter the query on the qpo_Value column
     *
     * Example usage:
     * <code>
     * $query->filterByQpoValue('fooValue');   // WHERE qpo_Value = 'fooValue'
     * $query->filterByQpoValue('%fooValue%', Criteria::LIKE); // WHERE qpo_Value LIKE '%fooValue%'
     * </code>
     *
     * @param     string $qpoValue The value to use as filter.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildQueryParameterOptionsQuery The current query, for fluid interface
     */
    public function filterByQpoValue($qpoValue = null, $comparison = null)
    {
        if (null === $comparison) {
            if (is_array($qpoValue)) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(QueryParameterOptionsTableMap::COL_QPO_VALUE, $qpoValue, $comparison);
    }

    /**
     * Exclude object from result
     *
     * @param   ChildQueryParameterOptions $queryParameterOptions Object to remove from the list of results
     *
     * @return $this|ChildQueryParameterOptionsQuery The current query, for fluid interface
     */
    public function prune($queryParameterOptions = null)
    {
        if ($queryParameterOptions) {
            $this->addUsingAlias(QueryParameterOptionsTableMap::COL_QPO_ID, $queryParameterOptions->getQpoId(), Criteria::NOT_EQUAL);
        }

        return $this;
    }

    /**
     * Deletes all rows from the queryparameteroptions_qpo table.
     *
     * @param ConnectionInterface $con the connection to use
     * @return int The number of affected rows (if supported by underlying database driver).
     */
    public function doDeleteAll(ConnectionInterface $con = null)
    {
        if (null === $con) {
            $con = Propel::getServiceContainer()->getWriteConnection(QueryParameterOptionsTableMap::DATABASE_NAME);
        }

        // use transaction because $criteria could contain info
        // for more than one table or we could emulating ON DELETE CASCADE, etc.
        return $con->transaction(function () use ($con) {
            $affectedRows = 0; // initialize var to track total num of affected rows
            $affectedRows += parent::doDeleteAll($con);
            // Because this db requires some delete cascade/set null emulation, we have to
            // clear the cached instance *after* the emulation has happened (since
            // instances get re-added by the select statement contained therein).
            QueryParameterOptionsTableMap::clearInstancePool();
            QueryParameterOptionsTableMap::clearRelatedInstancePool();

            return $affectedRows;
        });
    }

    /**
     * Performs a DELETE on the database based on the current ModelCriteria
     *
     * @param ConnectionInterface $con the connection to use
     * @return int             The number of affected rows (if supported by underlying database driver).  This includes CASCADE-related rows
     *                         if supported by native driver or if emulated using Propel.
     * @throws PropelException Any exceptions caught during processing will be
     *                         rethrown wrapped into a PropelException.
     */
    public function delete(ConnectionInterface $con = null)
    {
        if (null === $con) {
            $con = Propel::getServiceContainer()->getWriteConnection(QueryParameterOptionsTableMap::DATABASE_NAME);
        }

        $criteria = $this;

        // Set the correct dbName
        $criteria->setDbName(QueryParameterOptionsTableMap::DATABASE_NAME);

        // use transaction because $criteria could contain info
        // for more than one table or we could emulating ON DELETE CASCADE, etc.
        return $con->transaction(function () use ($con, $criteria) {
            $affectedRows = 0; // initialize var to track total num of affected rows

            QueryParameterOptionsTableMap::removeInstanceFromPool($criteria);

            $affectedRows += ModelCriteria::delete($con);
            QueryParameterOptionsTableMap::clearRelatedInstancePool();

            return $affectedRows;
        });
    }

} // QueryParameterOptionsQuery
