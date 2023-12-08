<?php

namespace ChurchCRM\model\ChurchCRM\Base;

use \Exception;
use \PDO;
use ChurchCRM\model\ChurchCRM\PredefinedReports as ChildPredefinedReports;
use ChurchCRM\model\ChurchCRM\PredefinedReportsQuery as ChildPredefinedReportsQuery;
use ChurchCRM\model\ChurchCRM\Map\PredefinedReportsTableMap;
use Propel\Runtime\Propel;
use Propel\Runtime\ActiveQuery\Criteria;
use Propel\Runtime\ActiveQuery\ModelCriteria;
use Propel\Runtime\Collection\ObjectCollection;
use Propel\Runtime\Connection\ConnectionInterface;
use Propel\Runtime\Exception\PropelException;

/**
 * Base class that represents a query for the 'query_qry' table.
 *
 * This contains all the predefined queries that appear in the queries page
 *
 * @method     ChildPredefinedReportsQuery orderByQryId($order = Criteria::ASC) Order by the qry_ID column
 * @method     ChildPredefinedReportsQuery orderByQrySql($order = Criteria::ASC) Order by the qry_SQL column
 * @method     ChildPredefinedReportsQuery orderByQryName($order = Criteria::ASC) Order by the qry_Name column
 * @method     ChildPredefinedReportsQuery orderByQryDescription($order = Criteria::ASC) Order by the qry_Description column
 * @method     ChildPredefinedReportsQuery orderByQryCount($order = Criteria::ASC) Order by the qry_Count column
 *
 * @method     ChildPredefinedReportsQuery groupByQryId() Group by the qry_ID column
 * @method     ChildPredefinedReportsQuery groupByQrySql() Group by the qry_SQL column
 * @method     ChildPredefinedReportsQuery groupByQryName() Group by the qry_Name column
 * @method     ChildPredefinedReportsQuery groupByQryDescription() Group by the qry_Description column
 * @method     ChildPredefinedReportsQuery groupByQryCount() Group by the qry_Count column
 *
 * @method     ChildPredefinedReportsQuery leftJoin($relation) Adds a LEFT JOIN clause to the query
 * @method     ChildPredefinedReportsQuery rightJoin($relation) Adds a RIGHT JOIN clause to the query
 * @method     ChildPredefinedReportsQuery innerJoin($relation) Adds a INNER JOIN clause to the query
 *
 * @method     ChildPredefinedReportsQuery leftJoinWith($relation) Adds a LEFT JOIN clause and with to the query
 * @method     ChildPredefinedReportsQuery rightJoinWith($relation) Adds a RIGHT JOIN clause and with to the query
 * @method     ChildPredefinedReportsQuery innerJoinWith($relation) Adds a INNER JOIN clause and with to the query
 *
 * @method     ChildPredefinedReports|null findOne(ConnectionInterface $con = null) Return the first ChildPredefinedReports matching the query
 * @method     ChildPredefinedReports findOneOrCreate(ConnectionInterface $con = null) Return the first ChildPredefinedReports matching the query, or a new ChildPredefinedReports object populated from the query conditions when no match is found
 *
 * @method     ChildPredefinedReports|null findOneByQryId(int $qry_ID) Return the first ChildPredefinedReports filtered by the qry_ID column
 * @method     ChildPredefinedReports|null findOneByQrySql(string $qry_SQL) Return the first ChildPredefinedReports filtered by the qry_SQL column
 * @method     ChildPredefinedReports|null findOneByQryName(string $qry_Name) Return the first ChildPredefinedReports filtered by the qry_Name column
 * @method     ChildPredefinedReports|null findOneByQryDescription(string $qry_Description) Return the first ChildPredefinedReports filtered by the qry_Description column
 * @method     ChildPredefinedReports|null findOneByQryCount(boolean $qry_Count) Return the first ChildPredefinedReports filtered by the qry_Count column *

 * @method     ChildPredefinedReports requirePk($key, ConnectionInterface $con = null) Return the ChildPredefinedReports by primary key and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildPredefinedReports requireOne(ConnectionInterface $con = null) Return the first ChildPredefinedReports matching the query and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 *
 * @method     ChildPredefinedReports requireOneByQryId(int $qry_ID) Return the first ChildPredefinedReports filtered by the qry_ID column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildPredefinedReports requireOneByQrySql(string $qry_SQL) Return the first ChildPredefinedReports filtered by the qry_SQL column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildPredefinedReports requireOneByQryName(string $qry_Name) Return the first ChildPredefinedReports filtered by the qry_Name column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildPredefinedReports requireOneByQryDescription(string $qry_Description) Return the first ChildPredefinedReports filtered by the qry_Description column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildPredefinedReports requireOneByQryCount(boolean $qry_Count) Return the first ChildPredefinedReports filtered by the qry_Count column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 *
 * @method     ChildPredefinedReports[]|ObjectCollection find(ConnectionInterface $con = null) Return ChildPredefinedReports objects based on current ModelCriteria
 * @method     ChildPredefinedReports[]|ObjectCollection findByQryId(int $qry_ID) Return ChildPredefinedReports objects filtered by the qry_ID column
 * @method     ChildPredefinedReports[]|ObjectCollection findByQrySql(string $qry_SQL) Return ChildPredefinedReports objects filtered by the qry_SQL column
 * @method     ChildPredefinedReports[]|ObjectCollection findByQryName(string $qry_Name) Return ChildPredefinedReports objects filtered by the qry_Name column
 * @method     ChildPredefinedReports[]|ObjectCollection findByQryDescription(string $qry_Description) Return ChildPredefinedReports objects filtered by the qry_Description column
 * @method     ChildPredefinedReports[]|ObjectCollection findByQryCount(boolean $qry_Count) Return ChildPredefinedReports objects filtered by the qry_Count column
 * @method     ChildPredefinedReports[]|\Propel\Runtime\Util\PropelModelPager paginate($page = 1, $maxPerPage = 10, ConnectionInterface $con = null) Issue a SELECT query based on the current ModelCriteria and uses a page and a maximum number of results per page to compute an offset and a limit
 *
 */
abstract class PredefinedReportsQuery extends ModelCriteria
{
    protected $entityNotFoundExceptionClass = '\\Propel\\Runtime\\Exception\\EntityNotFoundException';

    /**
     * Initializes internal state of \ChurchCRM\model\ChurchCRM\Base\PredefinedReportsQuery object.
     *
     * @param     string $dbName The database name
     * @param     string $modelName The phpName of a model, e.g. 'Book'
     * @param     string $modelAlias The alias for the model in this query, e.g. 'b'
     */
    public function __construct($dbName = 'default', $modelName = '\\ChurchCRM\\model\\ChurchCRM\\PredefinedReports', $modelAlias = null)
    {
        parent::__construct($dbName, $modelName, $modelAlias);
    }

    /**
     * Returns a new ChildPredefinedReportsQuery object.
     *
     * @param     string $modelAlias The alias of a model in the query
     * @param     Criteria $criteria Optional Criteria to build the query from
     *
     * @return ChildPredefinedReportsQuery
     */
    public static function create($modelAlias = null, Criteria $criteria = null)
    {
        if ($criteria instanceof ChildPredefinedReportsQuery) {
            return $criteria;
        }
        $query = new ChildPredefinedReportsQuery();
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
     * @return ChildPredefinedReports|array|mixed the result, formatted by the current formatter
     */
    public function findPk($key, ConnectionInterface $con = null)
    {
        if ($key === null) {
            return null;
        }

        if ($con === null) {
            $con = Propel::getServiceContainer()->getReadConnection(PredefinedReportsTableMap::DATABASE_NAME);
        }

        $this->basePreSelect($con);

        if (
            $this->formatter || $this->modelAlias || $this->with || $this->select
            || $this->selectColumns || $this->asColumns || $this->selectModifiers
            || $this->map || $this->having || $this->joins
        ) {
            return $this->findPkComplex($key, $con);
        }

        if ((null !== ($obj = PredefinedReportsTableMap::getInstanceFromPool(null === $key || is_scalar($key) || is_callable([$key, '__toString']) ? (string) $key : $key)))) {
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
     * @return ChildPredefinedReports A model object, or null if the key is not found
     */
    protected function findPkSimple($key, ConnectionInterface $con)
    {
        $sql = 'SELECT qry_ID, qry_SQL, qry_Name, qry_Description, qry_Count FROM query_qry WHERE qry_ID = :p0';
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
            /** @var ChildPredefinedReports $obj */
            $obj = new ChildPredefinedReports();
            $obj->hydrate($row);
            PredefinedReportsTableMap::addInstanceToPool($obj, null === $key || is_scalar($key) || is_callable([$key, '__toString']) ? (string) $key : $key);
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
     * @return ChildPredefinedReports|array|mixed the result, formatted by the current formatter
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
     * @return $this|ChildPredefinedReportsQuery The current query, for fluid interface
     */
    public function filterByPrimaryKey($key)
    {

        return $this->addUsingAlias(PredefinedReportsTableMap::COL_QRY_ID, $key, Criteria::EQUAL);
    }

    /**
     * Filter the query by a list of primary keys
     *
     * @param     array $keys The list of primary key to use for the query
     *
     * @return $this|ChildPredefinedReportsQuery The current query, for fluid interface
     */
    public function filterByPrimaryKeys($keys)
    {

        return $this->addUsingAlias(PredefinedReportsTableMap::COL_QRY_ID, $keys, Criteria::IN);
    }

    /**
     * Filter the query on the qry_ID column
     *
     * Example usage:
     * <code>
     * $query->filterByQryId(1234); // WHERE qry_ID = 1234
     * $query->filterByQryId(array(12, 34)); // WHERE qry_ID IN (12, 34)
     * $query->filterByQryId(array('min' => 12)); // WHERE qry_ID > 12
     * </code>
     *
     * @param     mixed $qryId The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildPredefinedReportsQuery The current query, for fluid interface
     */
    public function filterByQryId($qryId = null, $comparison = null)
    {
        if (is_array($qryId)) {
            $useMinMax = false;
            if (isset($qryId['min'])) {
                $this->addUsingAlias(PredefinedReportsTableMap::COL_QRY_ID, $qryId['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($qryId['max'])) {
                $this->addUsingAlias(PredefinedReportsTableMap::COL_QRY_ID, $qryId['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(PredefinedReportsTableMap::COL_QRY_ID, $qryId, $comparison);
    }

    /**
     * Filter the query on the qry_SQL column
     *
     * Example usage:
     * <code>
     * $query->filterByQrySql('fooValue');   // WHERE qry_SQL = 'fooValue'
     * $query->filterByQrySql('%fooValue%', Criteria::LIKE); // WHERE qry_SQL LIKE '%fooValue%'
     * </code>
     *
     * @param     string $qrySql The value to use as filter.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildPredefinedReportsQuery The current query, for fluid interface
     */
    public function filterByQrySql($qrySql = null, $comparison = null)
    {
        if (null === $comparison) {
            if (is_array($qrySql)) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(PredefinedReportsTableMap::COL_QRY_SQL, $qrySql, $comparison);
    }

    /**
     * Filter the query on the qry_Name column
     *
     * Example usage:
     * <code>
     * $query->filterByQryName('fooValue');   // WHERE qry_Name = 'fooValue'
     * $query->filterByQryName('%fooValue%', Criteria::LIKE); // WHERE qry_Name LIKE '%fooValue%'
     * </code>
     *
     * @param     string $qryName The value to use as filter.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildPredefinedReportsQuery The current query, for fluid interface
     */
    public function filterByQryName($qryName = null, $comparison = null)
    {
        if (null === $comparison) {
            if (is_array($qryName)) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(PredefinedReportsTableMap::COL_QRY_NAME, $qryName, $comparison);
    }

    /**
     * Filter the query on the qry_Description column
     *
     * Example usage:
     * <code>
     * $query->filterByQryDescription('fooValue');   // WHERE qry_Description = 'fooValue'
     * $query->filterByQryDescription('%fooValue%', Criteria::LIKE); // WHERE qry_Description LIKE '%fooValue%'
     * </code>
     *
     * @param     string $qryDescription The value to use as filter.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildPredefinedReportsQuery The current query, for fluid interface
     */
    public function filterByQryDescription($qryDescription = null, $comparison = null)
    {
        if (null === $comparison) {
            if (is_array($qryDescription)) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(PredefinedReportsTableMap::COL_QRY_DESCRIPTION, $qryDescription, $comparison);
    }

    /**
     * Filter the query on the qry_Count column
     *
     * Example usage:
     * <code>
     * $query->filterByQryCount(true); // WHERE qry_Count = true
     * $query->filterByQryCount('yes'); // WHERE qry_Count = true
     * </code>
     *
     * @param     boolean|string $qryCount The value to use as filter.
     *              Non-boolean arguments are converted using the following rules:
     *                * 1, '1', 'true',  'on',  and 'yes' are converted to boolean true
     *                * 0, '0', 'false', 'off', and 'no'  are converted to boolean false
     *              Check on string values is case insensitive (so 'FaLsE' is seen as 'false').
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildPredefinedReportsQuery The current query, for fluid interface
     */
    public function filterByQryCount($qryCount = null, $comparison = null)
    {
        if (is_string($qryCount)) {
            $qryCount = in_array(strtolower($qryCount), array('false', 'off', '-', 'no', 'n', '0', '')) ? false : true;
        }

        return $this->addUsingAlias(PredefinedReportsTableMap::COL_QRY_COUNT, $qryCount, $comparison);
    }

    /**
     * Exclude object from result
     *
     * @param   ChildPredefinedReports $predefinedReports Object to remove from the list of results
     *
     * @return $this|ChildPredefinedReportsQuery The current query, for fluid interface
     */
    public function prune($predefinedReports = null)
    {
        if ($predefinedReports) {
            $this->addUsingAlias(PredefinedReportsTableMap::COL_QRY_ID, $predefinedReports->getQryId(), Criteria::NOT_EQUAL);
        }

        return $this;
    }

    /**
     * Deletes all rows from the query_qry table.
     *
     * @param ConnectionInterface $con the connection to use
     * @return int The number of affected rows (if supported by underlying database driver).
     */
    public function doDeleteAll(ConnectionInterface $con = null)
    {
        if (null === $con) {
            $con = Propel::getServiceContainer()->getWriteConnection(PredefinedReportsTableMap::DATABASE_NAME);
        }

        // use transaction because $criteria could contain info
        // for more than one table or we could emulating ON DELETE CASCADE, etc.
        return $con->transaction(function () use ($con) {
            $affectedRows = 0; // initialize var to track total num of affected rows
            $affectedRows += parent::doDeleteAll($con);
            // Because this db requires some delete cascade/set null emulation, we have to
            // clear the cached instance *after* the emulation has happened (since
            // instances get re-added by the select statement contained therein).
            PredefinedReportsTableMap::clearInstancePool();
            PredefinedReportsTableMap::clearRelatedInstancePool();

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
            $con = Propel::getServiceContainer()->getWriteConnection(PredefinedReportsTableMap::DATABASE_NAME);
        }

        $criteria = $this;

        // Set the correct dbName
        $criteria->setDbName(PredefinedReportsTableMap::DATABASE_NAME);

        // use transaction because $criteria could contain info
        // for more than one table or we could emulating ON DELETE CASCADE, etc.
        return $con->transaction(function () use ($con, $criteria) {
            $affectedRows = 0; // initialize var to track total num of affected rows

            PredefinedReportsTableMap::removeInstanceFromPool($criteria);

            $affectedRows += ModelCriteria::delete($con);
            PredefinedReportsTableMap::clearRelatedInstancePool();

            return $affectedRows;
        });
    }

} // PredefinedReportsQuery
